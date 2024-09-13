from gtts import gTTS
from pydub import AudioSegment
import re

# This module is imported so that we can 
# play the converted audio
import os, subprocess
  
# The text that you want to convert to audio
mytext = 'It sounds like youre feeling down Can you tell me more about it What has been happening lately that is causing you to feel this way'
mytext = re.sub(r'[^A-Za-z0-9 ]+', '', mytext)
# Language in which you want to convert
language = 'en'
  
# Passing the text and language to the engine, 
# here we have marked slow=False. Which tells 
# the module that the converted audio should 
# have a high speed
myobj = gTTS(text=mytext, lang=language, slow=False)
  
# Saving the converted audio in a mp3 file named
# welcome 


myobj.save("audio.mp3")

# print("getting audio")

import mutagen
from mutagen.mp3 import MP3

# function to convert the information into
# some readable format
def audio_duration(length):
	hours = length // 3600 # calculate in hours
	length %= 3600
	mins = length // 60 # calculate in minutes
	length %= 60
	seconds = length # calculate in seconds

	return hours, mins, seconds # returns the duration

# Create a WAVE object
# Specify the directory address of your wavpack file
# "alarm.wav" is the name of the audiofile
audio = MP3("audio.mp3")

# contains all the metadata about the wavpack file
audio_info = audio.info
clip_length = int(audio_info.length)
hours, mins, seconds = audio_duration(clip_length) 

picture_list = []
# print("making syllable dict")
syllable_dict = dict()
syllable_dict["A"] = 1
syllable_dict["E"] = 1
syllable_dict["I"] = 1

syllable_dict["L"] = 2

syllable_dict["Q"] = 3
syllable_dict["W"] = 3

syllable_dict["TH"] = 4

syllable_dict["N"] = 5

for i in ["C","D","G","K","N","R","S","T","X","Y","Z","H"]:
    syllable_dict[i] = 6 

for i in ["B","M","P"]:
    syllable_dict[i] = 7 

for i in ["F","V"]:
    syllable_dict[i] = 8

for i in ["EE"]:
    syllable_dict[i] = 9

syllable_dict["O"] = 10

syllable_dict["U"] = 11

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
    if len(word) >= 2and "TH" == word[-2:]:
        picture_list.append(syllable_dict["TH"])
    elif len(word) >= 2 and "CH" == word[-2:]:
        picture_list.append(syllable_dict["CH"])
    elif len(word) >= 2 and "SH" == word[-2:]:
        picture_list.append(syllable_dict["SH"])
    else:
        picture_list.append(syllable_dict[word[-1]])


duration = clip_length/len(picture_list)

fps = 15

import cv2

w, h = None, None
for picture in picture_list:
    frame = cv2.imread("/Users/sophieliu/Desktop/Piano Translator copy/pictures/" +str(picture) +".png")
    # print("current", picture)
    if w is None:
        # Setting up the video writer
        h, w, _ = frame.shape
        fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')
        writer = cv2.VideoWriter('output.mp4', fourcc, fps, (w, h))

    # Repating the frame to fill the duration
    for repeat in range(int(duration * fps)):
        writer.write(frame)

writer.release()

def combine_audio(vidname, audname, outname, fps=60): 
    import moviepy.editor as mpe
    my_clip = mpe.VideoFileClip(vidname)
    audio_background = mpe.AudioFileClip(audname)
    final_clip = my_clip.set_audio(audio_background)
    final_clip.write_videofile(outname,fps=fps)

combine_audio("output.mp4", "audio.mp3", "output.mp4")