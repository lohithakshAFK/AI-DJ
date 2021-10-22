left_wrist_y = 0;
right_wrist_y = 0;
left_wrist_x = 0;
right_wrist_x = 0;
song = "";

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
}

function modelLoaded(){
    console.log("....................")
}

function draw(){
    image(video,0,0,500,500);

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if (results.length > 0){
          console.log(results);
          left_wrist_x = results[0].pose.leftWrist.x;
          left_wrist_y = results[0].pose.leftWrist.y;
          right_wrist_x = results[0].pose.rightWrist.x;
          right_wrist_y = results[0].pose.rightWrist.y;
          console.log("Position of right wrist is x = " + right_wrist_x + " y = " + right_wrist_y);
          console.log("Position of left wrist is x = " + left_wrist_x + " y = " + left_wrist_y);
    }
}