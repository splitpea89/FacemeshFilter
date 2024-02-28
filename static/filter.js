let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  img2 = loadImage('/static/hat.png')
  img1 = loadImage('/static/stache.png')
img3 = loadImage('/static/bandana.png')
  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // drawKeypoints();
  printAnnotations();
}

function printAnnotations(){
  if (predictions.length > 0) {

    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    // let x =  predictions[0].annotations.midwayBetweenEyes[0][0];
    // let y =  predictions[0].annotations.midwayBetweenEyes[0][1];

    const right = predictions[0].annotations.silhouette[8][0];
    const left = predictions[0].annotations.silhouette[28][0];

    const foreheadx = predictions[0].annotations.silhouette[0][0];
    const foreheady = predictions[0].annotations.silhouette[0][1];

    const x = midEyes[0]
    const y = midEyes[1]
    const z = midEyes[2]

    const facewidth = right - left;

    image(img2, foreheadx - facewidth/1.5, foreheady -facewidth*1.25, facewidth * 1.4, facewidth * 1.4);

    image(img1, foreheadx - facewidth/2, y, facewidth, facewidth);

    image(img3, foreheadx-facewidth/(1.75), foreheady +facewidth*1, facewidth * 1, facewidth * 1);

  }
}





function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}
