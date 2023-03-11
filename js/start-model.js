import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

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
    document.getElementById("webgl-start-model").appendChild(renderer.domElement)

    window.addEventListener("resize", function updateAspectRatio() {
        //Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight)

        //Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x030303);

    //Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 1))
    scene.add(camera)

    //Camera controls
    cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.enabled = false
    cameraControls.enableDamping = true
    cameraControls.autoRotate = false
    cameraControls.autoRotateSpeed = 2
}

function load() {
    //Sphere
    let sphereGeometry = new THREE.SphereGeometry(6, 64, 64)
    let sphereMaterial = new THREE.MeshStandardMaterial({
        // color: "#ab12bf"
        color: "0x030303"
    })
    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.position.set(0, 0, 0)
    scene.add(sphereMesh)

    //Lights
    let ambientLight = new THREE.AmbientLight(0x030303, 1)
    scene.add(ambientLight)

    let spotLight1 = new THREE.SpotLight(0xab12bf, 1)
    spotLight1.position.set(0, 20, -10)
    spotLight1.penumbra = 1
    scene.add(spotLight1)

    let spotLight2 = new THREE.SpotLight(0xab12bf, 2)
    spotLight2.position.set(0, 0, 7.8)
    spotLight2.penumbra = 1
    spotLight2.distance = 10
    scene.add(spotLight2)
}

function update() {
    let quaternion = new THREE.Quaternion
    let vectorZ = new THREE.Vector3(0, 0, 1)
    camera.position.applyQuaternion(quaternion.setFromAxisAngle(vectorZ, Math.PI / 200))
    camera.up.applyQuaternion(quaternion.setFromAxisAngle(vectorZ, Math.PI / 200))
    cameraControls.update()
}

function render() {
	window.requestAnimationFrame(render)
	update()
	renderer.render(scene, camera)
}