// Use JSDELIVR to get the files from a GitHub repository
// https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>
var repo_site = "https://cdn.jsdelivr.net/gh/kywch/jsPsych-in-Qualtrics/flanker/";

/* experiment parameters */
var reps_per_trial_type = 4;

/*set up welcome block*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};

/*set up instructions block*/
var instructions = {
    type: 'html-button-response',
    stimulus: '<p>Each screen will show either an English word or letters that do not form a word.</p>'+
    '<p>Press Y if the letters form a valid word.</p><p>Press N if the letters do not form a valid word.</p>',
    choices: ['Ready to start'],
    post_trial_gap: 1000
};

/*defining stimuli*/
var stimuli = [
    {word: 'woman', word_validity: 'valid', word_frequency: 'high'},
    {word: 'title', word_validity: 'valid', word_frequency: 'high'},
    {word: 'speed', word_validity: 'valid', word_frequency: 'high'},
    {word: 'movie', word_validity: 'valid', word_frequency: 'high'},
    {word: 'night', word_validity: 'valid', word_frequency: 'high'},
    {word: 'house', word_validity: 'valid', word_frequency: 'high'},
    {word: 'child', word_validity: 'valid', word_frequency: 'high'},
    {word: 'apple', word_validity: 'valid', word_frequency: 'high'},
    {word: 'books', word_validity: 'valid', word_frequency: 'high'},
    {word: 'color', word_validity: 'valid', word_frequency: 'high'},
    {word: 'whigs', word_validity: 'valid', word_frequency: 'low'},
    {word: 'pecan', word_validity: 'valid', word_frequency: 'low'},
    {word: 'hanky', word_validity: 'valid', word_frequency: 'low'},
    {word: 'femur', word_validity: 'valid', word_frequency: 'low'},
    {word: 'tusks', word_validity: 'valid', word_frequency: 'low'},
    {word: 'tongs', word_validity: 'valid', word_frequency: 'low'},
    {word: 'petal', word_validity: 'valid', word_frequency: 'low'},
    {word: 'dunce', word_validity: 'valid', word_frequency: 'low'},
    {word: 'friar', word_validity: 'valid', word_frequency: 'low'},
    {word: 'gable', word_validity: 'valid', word_frequency: 'low'},
    {word: 'womfn', word_validity: 'invalid', word_frequency: undefined},
    {word: 'tgtle', word_validity: 'invalid', word_frequency: undefined},
    {word: 'speqd', word_validity: 'invalid', word_frequency: undefined},
    {word: 'movje', word_validity: 'invalid', word_frequency: undefined},
    {word: 'npght', word_validity: 'invalid', word_frequency: undefined},
    {word: 'hoxse', word_validity: 'invalid', word_frequency: undefined},
    {word: 'chrld', word_validity: 'invalid', word_frequency: undefined},
    {word: 'wpple', word_validity: 'invalid', word_frequency: undefined},
    {word: 'boxks', word_validity: 'invalid', word_frequency: undefined},
    {word: 'colwr', word_validity: 'invalid', word_frequency: undefined},
    {word: 'whzgs', word_validity: 'invalid', word_frequency: undefined},
    {word: 'pecjn', word_validity: 'invalid', word_frequency: undefined},
    {word: 'hankk', word_validity: 'invalid', word_frequency: undefined},
    {word: 'fembr', word_validity: 'invalid', word_frequency: undefined},
    {word: 'tmsks', word_validity: 'invalid', word_frequency: undefined},
    {word: 'tvngs', word_validity: 'invalid', word_frequency: undefined},
    {word: 'pettl', word_validity: 'invalid', word_frequency: undefined},
    {word: 'duncr', word_validity: 'invalid', word_frequency: undefined},
    {word: 'friwr', word_validity: 'invalid', word_frequency: undefined},
    {word: 'gabls', word_validity: 'invalid', word_frequency: undefined}
  ];

/* defining test timeline */
var trials = {
    timeline_variables: stimuli,
    randomize_order: true,
    timeline: [
      {
        type: 'html-keyboard-response',
        stimulus: '<p class="stimulus">+</p>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 500,
        post_trial_gap: 0
      },
      {
        type: 'html-keyboard-response',
        stimulus: function(){ return "<p class='stimulus'>"+jsPsych.timelineVariable('word', true)+"</p>"; },
        choices: ['y','n'],
        post_trial_gap: 0,
        data: {
          word_validity: jsPsych.timelineVariable('word_validity'),
          word_frequency: jsPsych.timelineVariable('word_frequency')
        },
        on_finish: function(data){
          if(data.word_validity == 'valid'){
            var correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('y');
          } else {
            var correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('n');
          }
          data.correct = correct;
        }
      }
    ]
  };


/*defining debriefing block*/
var debrief = {
    type: 'html-keyboard-response',
    choices: ['c'],
    stimulus: function(){
      var high_rt = jsPsych.data.get().filter({word_frequency: 'high', correct: true}).select('rt').mean();
      var low_rt = jsPsych.data.get().filter({word_frequency: 'low', correct: true}).select('rt').mean();

      var message = "<p>All done!</p>"+
        "<p>Your average correct response time for high frequency English words was "+Math.round(high_rt)+"ms.</p>"+
        "<p>Your average correct response time for low frequency English words was "+Math.round(low_rt)+"ms.</p>"+
        "<p>The typical pattern of results is that people are faster to respond to high frequency (common) "+
        "word than low frequency (uncommon) words.</p>"+
        "<p>Press C to see the entire set of data generated by this experiment.</p>";

      return message;

    }
};

/*set up experiment structure*/
var timeline = [];
timeline.push(welcome);
timeline.push(instructions);
timeline.push(trials);
timeline.push(debrief);