import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo con bordes oscuros y color violeta oscuro
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x8B008B, // Violeta oscuro
  side: THREE.DoubleSide,
  wireframe: true,
  wireframeLinewidth: 1,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Ajustar el tamaño del cubo
cube.scale.set(0.2, 0.2, 0.2);

// Configurar la cámara
camera.position.set(0, 0, 5);

// Configurar controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = true;

// Animación
const animate = function () {
  requestAnimationFrame(animate);

  // Rotar el cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Actualizar los controles
  controls.update();

  // Renderizar la escena
  renderer.render(scene, camera);
};

// Responder a cambios en el tamaño de la ventana
window.addEventListener('resize', function () {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Llamar a la función de animación
animate();
