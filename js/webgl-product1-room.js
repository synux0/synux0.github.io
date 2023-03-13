import * as THREE from "three"
import {OrbitControls} from "OrbitControls"
import {GLTFLoader} from "GLTFLoader"
import { AxesHelper } from "three"

//Global elements
let scene, camera, renderer
let cameraControls
let gltfLoader = new GLTFLoader()

//Objects
let laptop = new THREE.Object3D()

init()
load()
render()

function init() {
    //Renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)
    renderer.shadowMap.enabled = true
    document.getElementById("webgl-product1-room").appendChild(renderer.domElement)

    window.addEventListener("resize", function updateAspectRatio() {
        //Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight)

        //Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    //Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 3, 40);
    camera.lookAt(new THREE.Vector3(0, 5, 0))
    scene.add(camera)

    //Camera controls
    cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.target.set(0, 1.2, 0)
    cameraControls.enabled = true
    cameraControls.enableDamping = true
    cameraControls.autoRotate = false
    cameraControls.autoRotateSpeed = 2
}

function load() {
    //Laptop
    gltfLoader.load("../models/gaming_laptop/scene.gltf", function (gltf) {
        laptop = gltf.scene
        laptop.rotation.y = - Math.PI / 2
        scene.add(laptop)
    }, undefined, function (error) {
        console.error(error)
    })

    // Ground
    let groundGeometry = new THREE.PlaneGeometry(50, 50, 10, 10)
    let groundMaterial = new THREE.MeshStandardMaterial({
        color: "grey"
    });
    let groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.receiveShadow = true
    scene.add(groundMesh)

    //Wall1
    let wallGeometry1 = new THREE.BoxGeometry(50, 25, 1, 10, 10)
    let wallMaterial1 = new THREE.MeshStandardMaterial({
        color: "grey"
    })
    let wallMesh1 = new THREE.Mesh(wallGeometry1, wallMaterial1)
    wallMesh1.position.set(0, 12.5, -25)
    scene.add(wallMesh1)

    //Wall2
    let wallGeometry2 = new THREE.BoxGeometry(50, 25, 1, 10, 10)
    let wallMaterial2 = new THREE.MeshStandardMaterial({
        color: "grey"
    })
    let wallMesh2 = new THREE.Mesh(wallGeometry2, wallMaterial2)
    wallMesh2.position.set(25, 12.5, 0)
    wallMesh2.rotation.y = Math.PI/2
    scene.add(wallMesh2)

    //Wall3
    let wallGeometry3 = new THREE.BoxGeometry(50, 25, 1, 10, 10)
    let wallMaterial3 = new THREE.MeshStandardMaterial({
        color: "grey"
    })
    let wallMesh3 = new THREE.Mesh(wallGeometry3, wallMaterial3)
    wallMesh3.position.set(0, 12.5, 25)
    scene.add(wallMesh3)

    //Wall4
    let wallGeometry4 = new THREE.BoxGeometry(50, 25, 1, 10, 10)
    let wallMaterial4 = new THREE.MeshStandardMaterial({
        color: "grey"
    })
    let wallMesh4 = new THREE.Mesh(wallGeometry4, wallMaterial4)
    wallMesh4.position.set(-25, 12.5, 0)
    wallMesh4.rotation.y = Math.PI/2
    scene.add(wallMesh4)

    //Lights
    let ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    scene.add(new AxesHelper(50))
}

function update() {
    cameraControls.update()
}

function render() {
	window.requestAnimationFrame(render)
	update()
	renderer.render(scene, camera)
}