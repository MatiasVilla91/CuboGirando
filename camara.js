import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { PointerLockControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/PointerLockControls.js';

// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
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

// Configurar la cámara con PointerLockControls
const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

// Configuración de bloqueo/desbloqueo del cursor para controles PointerLock
const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');
const havePointerLock =
  'pointerLockElement' in document ||
  'mozPointerLockElement' in document ||
  'webkitPointerLockElement' in document;

if (havePointerLock) {
  const element = document.body;

  const pointerlockchange = function () {
    if (document.pointerLockElement === element ||
        document.mozPointerLockElement === element ||
        document.webkitPointerLockElement === element) {
      controls.enabled = true;
      blocker.style.display = 'none';
    } else {
      controls.enabled = false;
      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';
      instructions.style.display = '';
    }
  };

  const pointerlockerror = function () {
    instructions.style.display = '';
  };

  // Configuración de eventos
  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

  document.addEventListener('pointerlockerror', pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

  instructions.addEventListener('click', function () {
    instructions.style.display = 'none';

    // Solicitar el bloqueo del cursor
    element.requestPointerLock =
      element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock;

    if (/Firefox/i.test(navigator.userAgent)) {
      const fullscreenchange = function () {
        if (document.fullscreenElement === element ||
            document.mozFullscreenElement === element ||
            document.mozFullScreenElement === element) {
          document.removeEventListener('fullscreenchange', fullscreenchange);
          document.removeEventListener('mozfullscreenchange', fullscreenchange);

          element.requestPointerLock();
        }
      };

      document.addEventListener('fullscreenchange', fullscreenchange, false);
      document.addEventListener('mozfullscreenchange', fullscreenchange, false);

      element.requestFullscreen =
        element.requestFullscreen ||
        element.mozRequestFullscreen ||
        element.mozRequestFullScreen ||
        element.webkitRequestFullscreen;

      element.requestFullscreen();
    } else {
      element.requestPointerLock();
    }
  }, false);
} else {
  instructions.innerHTML = 'Tu navegador no es compatible con Pointer Lock API';
}

// Animación
const animate = function () {
  requestAnimationFrame(animate);

  // Rotar el cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

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
