import "./styles.css";
import * as THREE from "three.js";

function main() {
  const canvas = document.getElementById("c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75; // field of view
  const aspect = 2; // соотношение сторон холста
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 3;

  const scene = new THREE.Scene();

  const cubes = [
    createCube(1, 0x00ff00, -2, -1, 0),
    createCube(1, 0xff0000, 0, 0, 0),
    createCube(1, 0xffff00, 2, 1, 0),
    createCube(1, 0x00ffff, 1.5, -1.5, 1)
  ];

  cubes.forEach((cube) => scene.add(cube));

  addLight(scene);
  renderCube(scene, camera, renderer, cubes);
}

function createCube(size, cubeColor, x, y, z) {
  const boxWidth = size;
  const boxHeight = size;
  const boxDepth = size;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshPhongMaterial({ color: cubeColor });
  const cube = new THREE.Mesh(geometry, material);
  if (x !== undefined && x !== null) cube.position.x = x;
  if (y !== undefined && y !== null) cube.position.y = y;
  if (z !== undefined && z !== null) cube.position.z = z;

  return cube;
}

function addLight(scene) {
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-2, 3, 3.1);
  scene.add(light);
}

function renderCube(scene, camera, renderer, cubes) {
  function render(time) {
    time *= 0.001; // convert to sec

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio; //needs to optimise rendering for hd dpi
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.heigth !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

main();
