import React, { useState } from "react";

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px"
  },
  formInput: {
    // width: "50%",
    backgroundColor: "#e0fff8",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    style: "textarea"
  },
  formLabel: {
    fontSize: "20px",
    marginBottom: "10px"
  },
  submitButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    borderRadius: "10px",
    border: "none",
    width: "100px",
    marginTop: "20px"
  }
};

function CBTThoughtDiary() {
  const [formData, setFormData] = useState({
    situation: "",
    emotion: "",
    thought: "",
    evidenceFor: "",
    evidenceAgainst: "",
    challenge: "",
    newPerspective: "",
    newEmotion: ""
  });

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // Send formData to your API or save it in the local storage
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <label style={styles.formLabel}>
        Situation (Walking in front of a group of people):
        <input
          style={styles.formInput}
          type="textarea"
          name="situation"
          value={formData.situation}
          onChange={handleInputChange}
        />
      </label>
      <label style={styles.formLabel}>
        Emotion (They are talking about me):
        <input
          style={styles.formInput}
          type="textarea"
          name="emotion"
          value={formData.emotion}
          onChange={handleInputChange}
        />
      </label>
      <label style={styles.formLabel}>
        Thought (Anger, Anxious, Fear):
        <input
          style={styles.formInput}
          type="textarea"
          name="thought"
          value={formData.thought}
          onChange={handleInputChange}
        />
      </label>
      <label style={styles.formLabel}>
        Evidence For (They're laughing and whispering):
        <input
          style={styles.formInput}
          type="textarea"
          name="evidenceFor"
          value={formData.evidenceFor}
          onChange={handleInputChange}
        />
      </label>
      <label style={styles.formLabel}>
        Evidence Against (I can't hear them clearly):
        <input
          style={styles.formInput}
          type="textarea"
          name="evidenceAgainst"
          value={formData.evidenceAgainst}
          onChange={handleInputChange}
          />
          </label>
          <br />
          <label style={styles.formLabel}>
          Alternative Thoughts (Their opinions don't define me):
          <input
                 style={styles.formInput}
                 type="textarea"
                 name="alternativeThoughts"
                 value={formData.alternativeThoughts}
                 onChange={handleInputChange}
               />
          </label>
          <br />
          <button style={styles.submitButton} type="submit">
          Submit
          </button>
          </form>
          );
          };
          
export default CBTThoughtDiary;