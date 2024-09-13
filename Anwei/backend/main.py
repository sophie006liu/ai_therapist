from flask import Flask, request, make_response
import os
import openai
import sys, ffmpeg

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

openai.api_key = "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"

@app.route('/')  # this is the home page route
@cross_origin()
def hello_world(
):  # this is the home page function that generates the page code
    return "Hello world!"

def make_video(mytext):
    print("MAKING VIDEO")
    from gtts import gTTS
    from pydub import AudioSegment
    import re
    import os, subprocess
   
    mytext = re.sub(r'[^A-Za-z0-9 ]+', '', mytext)
    # print("processed text:" , mytext)
    # Language in which you want to convert
    language = 'en'
  
    # Passing the text and language to the engine, 
    # here we have marked slow=False. Which tells 
    # the module that the converted audio should 
    # have a high speed
    myobj = gTTS(text=mytext, lang=language, slow=False)

    myobj.save("audio.mp3")
 

    import mutagen
    from mutagen.mp3 import MP3
    
    # Create a WAVE object
    # Specify the directory address of your wavpack file
    # "alarm.wav" is the name of the audiofile
    audio = MP3("audio.mp3")

    # contains all the metadata about the wavpack file
    audio_info = audio.info
    clip_length = int(audio_info.length)  

    picture_list = []
    # print("making syllable dict")
    syllable_dict = {"A": 1,"E": 1,"I": 1,"L": 2,"Q": 3,"W":3,"TH": 4,"N":5, "EE":9, "O":10 , "U":11}

    for i in ["C","D","G","K","N","R","S","T","X","Y","Z","H"]:
        syllable_dict[i] = 6 

    for i in ["B","M","P"]:
        syllable_dict[i] = 7 

    for i in ["F","V"]:
        syllable_dict[i] = 8

    for i in ["CH","J","SH"]:
        syllable_dict[i] = 12

    # print("making picture list")
    for word in mytext.split(" "):
        if not word.isalpha():  
            continue
        word = word.upper()
        #first syllable
        if len(word) >= 2 and "TH" == word[0:2]:
            picture_list.append(syllable_dict["TH"])
        elif len(word) >= 2 and "CH" == word[0:2]:
            picture_list.append(syllable_dict["CH"])
        elif len(word) >= 2 and "SH" == word[0:2]:
            picture_list.append(syllable_dict["SH"])
        else:
            picture_list.append(syllable_dict[word[0]])

        #last syllable
        if len(word) >= 3 and "TH" == word[-2:]:
            picture_list.append(syllable_dict["TH"])
        elif len(word) >= 2 and "CH" == word[-2:]:
            picture_list.append(syllable_dict["CH"])
        elif len(word) >= 2 and "SH" == word[-2:]:
            picture_list.append(syllable_dict["SH"])
        else:
            picture_list.append(syllable_dict[word[-1]])
    # print(clip_length, len(picture_list) )
    duration = max(clip_length/len(picture_list),1)

    fps = 10


    import cv2

    w, h = None, None
    for picture in picture_list:
        # print(os.path.exists(str(picture) +".png"))
        frame = cv2.imread(str(picture) +".png") 
  
        # print("current", picture)
        if w is None:
            # print("w is none")
            # Setting up the video writer
            h, w, _ = frame.shape
            fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')
            writer = cv2.VideoWriter('output.mp4', fourcc, fps, (w, h))

        writer.write(frame)

    writer.release()
    def combine_audio(vidname, audname, outname, fps): 
        import moviepy.editor as mpe
        my_clip = mpe.VideoFileClip(vidname)
        audio_background = mpe.AudioFileClip(audname)
        final_clip = my_clip.set_audio(audio_background)
        final_clip.write_videofile(outname,fps)

    combine_audio("output.mp4", "audio.mp3", "/Users/sophieliu/Desktop/Piano Translator copy/aicontent/src/video.mp4",5)

@app.route('/webhook', methods=['GET'])
@cross_origin()
def webhook():
    query = request.args.get('input')
    print("here is the input: ", input)
    response =  openai.Completion.create(
        model="text-davinci-003",
        prompt= "The following is a conversation with a therapist and a user. The therapist is JOY, who uses compassionate listening to have helpful and meaningful conversations with users. JOY is empathic and friendly. JOY's objective is to make the user feel better by feeling heard. With each response, JOY offers follow-up questions to encourage openness and tries to continue the conversation in a natural way. \n\nJOY-> Hello, I am your personal mental health assistant. What's on your mind today?\n" +query,
        temperature=0.89,
        max_tokens=162,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=["\n"]
            ) 
    print("done")
    print(response)

    openai_response = response["choices"][0]["text"].strip()
    response = make_response(openai_response)
    #response.headers.add('Access-Control-Allow-Origin',"*")
    return response

@app.route('/talking', methods=['GET'])
@cross_origin()
def talking():
    query = request.args.get('input')
    # print("here is the input: ", query)
    response =  openai.Completion.create(
        model="text-davinci-003",
        prompt= "The following is a conversation with a therapist and a user. The therapist is JOY, who uses compassionate listening to have helpful and meaningful conversations with users. JOY is empathic and friendly. JOY's objective is to make the user feel better by feeling heard. With each response, JOY offers follow-up questions to encourage openness and tries to continue the conversation in a natural way. \n\nJOY-> Hello, I am your personal mental health assistant. What's on your mind today?\n" +query,
        temperature=0.89,
        max_tokens=162,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=["\n"]
            ) 

    openai_response = response["choices"][0]["text"].strip()
    response = make_response(openai_response)

    # print("done")
    # print("here is the reponse", response.data, str(response.data)[1:])
    make_video(str(response.data)[1:])
    return response


if __name__ == '__main__':
    app.run(port=os.getenv("PORT", default=3010))

