// import * as THREE from "three"
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//Global elements
let scene, camera, renderer
let cameraControls

//Objects
let light
let sphereMesh

init()
load()
render()

function init() {
    //Renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)
    renderer.setClearColor( new THREE.Color(0xFFFFFF) )
    document.getElementById("container").appendChild(renderer.domElement)

    window.addEventListener("resize", function updateAspectRatio() {
        //Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight)

        //Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    //Scene
    scene = new THREE.Scene()

    //Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 20
    scene.add(camera)

    //Camera controls
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement)
    cameraControls.enableDamping = true
    cameraControls.enablePan = false
    cameraControls.enableZoom = false
    cameraControls.autoRotate = true
    cameraControls.autoRotateSpeed = 5
}

function load() {
    //Sphere object
    let sphereGeometry = new THREE.SphereGeometry(3, 64, 64)
    let sphereMaterial = new THREE.MeshStandardMaterial({
        color: "#00ff83"
    })
    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphereMesh)

    //Lights
    light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 10, 10)
    scene.add(light)
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