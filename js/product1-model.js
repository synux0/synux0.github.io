import * as THREE from "three"
import {OrbitControls} from "OrbitControls"
import {GLTFLoader} from "GLTFLoader"

//Global elements
let scene, camera, renderer
let cameraControls

//Objects

init()
load()
render()

function init() {
    //Renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)
    renderer.shadowMap.enabled = false
    document.getElementById("webgl-product1-model").appendChild(renderer.domElement)

    window.addEventListener("resize", function updateAspectRatio() {
        //Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight)

        //Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000);

    //Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 3, 6);
    camera.lookAt(new THREE.Vector3(0, 1.2, 0))
    scene.add(camera)

    //Camera controls
    cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.target.set(0, 1.2, 0)
    cameraControls.enabled = false
    cameraControls.enableDamping = true
    cameraControls.autoRotate = true
    cameraControls.autoRotateSpeed = 2
}

function load() {
    //Laptop
    let gltfLoader = new GLTFLoader()
    gltfLoader.load("../models/gaming_laptop/scene.gltf", function (gltf) {
        gltf.scene.position.y = 0
        gltf.scene.rotation.y = - Math.PI / 2
        scene.add(gltf.scene)
    }, undefined, function (error) {
        console.error(error)
    })

    //Lights
    let ambientLight = new THREE.AmbientLight(0xffffff, 5)
    scene.add(ambientLight)

    let directionalLight1 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight1.position.set(0, 10, -10)
    scene.add(directionalLight1)

    let directionalLight2 = new THREE.DirectionalLight(0xffffff, 5)
    directionalLight2.position.set(0, 10, 0)
    scene.add(directionalLight2)

    let directionalLight3 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight3.position.set(0, -2, -10)
    scene.add(directionalLight3)
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