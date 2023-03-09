import * as THREE from "three"
import {OrbitControls} from "OrbitControls"

//Global elements
let scene, camera, renderer
let cameraControls

//Objects
let sphereMesh

init()
load()
render()

function init() {
    //Renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)
    renderer.shadowMap.enabled = true
    document.getElementById("webgl-product3-model").appendChild(renderer.domElement)

    window.addEventListener("resize", function updateAspectRatio() {
        //Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight)

        //Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x808080);

    //Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 2, 20);
    scene.add(camera)

    //Camera controls
    cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.enableDamping = true
    cameraControls.enablePan = false
    cameraControls.enableZoom = false
    cameraControls.autoRotate = true
    cameraControls.autoRotateSpeed = 3
}

function load() {
    //Sphere object
    let sphereGeometry = new THREE.SphereGeometry(3, 64, 64)
    let sphereMaterial = new THREE.MeshStandardMaterial({
        color: "#00ff83"
    })
    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.position.set(0, 3, 0)
    sphereMesh.castShadow = true
    scene.add(sphereMesh)

    // Ground
    let groundGeometry = new THREE.PlaneGeometry(40,40,10,10)
    let groundMaterial = new THREE.MeshStandardMaterial({
        color: 'grey'
    });
    let groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.receiveShadow = true
    scene.add(groundMesh)

    //Lights
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    let spotLight = new THREE.SpotLight(0xffffff, 0.5)
    spotLight.position.set(-10, 10, 0)
    spotLight.castShadow = true
    spotLight.penumbra = 0.3
    scene.add(spotLight)

    //Axes
    scene.add(new THREE.AxesHelper(20))
}

function update() {
    // Cambios para actualizar la camara segun mvto del raton
    cameraControls.update()
}

function render() {
	window.requestAnimationFrame(render)
	update()
	renderer.render(scene, camera)
}