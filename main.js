song=""
score_right_wrist=0
score_left_wrist=0
right_wristX=0
right_wristY=0
left_wristX=0
left_wristY=0

function preload(){
    song=loadSound("music.mp3")
}


function setup(){
    canvas=createCanvas(600,600)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modal_loaded)
    poseNet.on("pose",got_poses)
}





function modal_loaded(){
    console.log("Model is loaded")
}


function got_poses(results){
console.log(results)
if (results.length>0) {
    score_right_wrist=results[0].pose.keypoints[10].score
    score_left_wrist=results[0].pose.keypoints[9].score
    right_wristX=results[0].pose.rightWrist.x
    right_wristY=results[0].pose.rightWrist.y
    left_wristX=results[0].pose.leftWrist.x
    left_wristY=results[0].pose.leftWrist.y
}
}




function draw(){
    image(video,0,0,600,600)
    fill("red")
    stroke("black")
    if (score_right_wrist>0.2) {
        circle(right_wristX,right_wristY,20)
    if (right_wristY>0 &&right_wristY<100) {
        document.getElementById("speed").innerHTML="speed=0.5x"
        song.rate(0.5)
    }
    else if (right_wristY>100 &&right_wristY<200) {
        document.getElementById("speed").innerHTML="speed=1.0x"
        song.rate(1.0)
    }


    else if (right_wristY>200 &&right_wristY<300) {
        document.getElementById("speed").innerHTML="speed=1.5x"
        song.rate(1.5)
    }


    else if (right_wristY>300 &&right_wristY<400) {
        document.getElementById("speed").innerHTML="speed=2.0x"
        song.rate(2.0)
    }



    else if (right_wristY>400 &&right_wristY<500) {
        document.getElementById("speed").innerHTML="speed=2.5x"
        song.rate(2.5)
    }
}
    if (score_left_wrist>0.2) {
        circle(left_wristX,left_wristY,20)
        no=Number(left_wristY)
        newNumber=floor(no*2)
        newNumber2=newNumber/1000
        document.getElementById("volume").innerHTML="volume="+newNumber2
        song.setVolume(newNumber2)
    }
}




function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}