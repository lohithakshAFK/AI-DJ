left_wrist_y = 0;
right_wrist_y = 0;
left_wrist_x = 0;
right_wrist_x = 0;
song = "";

score_left = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose = ml5.poseNet(video,modelLoaded);
    pose.on("pose",gotPoses)
};

function modelLoaded(){
    console.log("....................")
};

function draw(){
    image(video,0,0,500,500);
    stroke("red");
    fill("red");

    circle(right_wrist_x,right_wrist_y,20);
    if(right_wrist_y > 0 && right_wrist_y <= 100){
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
        song.rate(0.5);
    }
    else if(right_wrist_y > 100 && right_wrist_y <= 200){
        document.getElementById("speed").innerHTML = "Speed: 1x";
        song.rate(1);
    }
    else if(right_wrist_y > 200 && right_wrist_y <= 300){
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
        song.rate(1.5);
    }
    else if(right_wrist_y > 300 && right_wrist_y <= 400){
        document.getElementById("speed").innerHTML = "Speed: 2x";
        song.rate(2);
    }    
    else if(right_wrist_y > 400 && right_wrist_y <=500){
        document.getElementById("speed").innerHTML = "Speed: 2.5x";
        song.rate(2.5);
    }

    if (score_left > 0.2){
    circle(left_wrist_x,left_wrist_y,20);
    number_left = Number(left_wrist_y);
    number_left_left = floor(number_left);
    volume = number_left_left / 500;
    document.getElementById("volume").innerHTML = "Volume : " + volume;
    song.setVolume(volume);
    }
};

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
};

function gotPoses(results){
    if (results.length > 0){
          console.log(results);
          left_wrist_x = results[0].pose.leftWrist.x;
          left_wrist_y = results[0].pose.leftWrist.y;
          right_wrist_x = results[0].pose.rightWrist.x;
          right_wrist_y = results[0].pose.rightWrist.y;
          console.log("Position of right wrist is x = " + right_wrist_x + " y = " + right_wrist_y);
          console.log("Position of left wrist is x = " + left_wrist_x + " y = " + left_wrist_y);

          score_left = results[0].pose.keypoints[9].score;
          console.log("score = " + score_left);
    };
};
