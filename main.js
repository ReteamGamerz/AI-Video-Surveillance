video = "";
status = "";
objects = [];

function setup() {
   canvas = createCanvas(480, 380);
   canvas.center()
}

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
  
    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i <objects.length; i++) {
            document.getElementById("object_detection").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Numbers Of Objects Detected" + objects.length;

            fill("#6942f5");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#6942f5");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object_detection").innerHTML = "Status = Object Detection";
}

function modelLoaded() {
    console.log("Model Loaded!!!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}