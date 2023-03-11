import * as THREE from "three";

//Global elements
let scene, camera, renderer

//Objects

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
    scene.background = new THREE.Color(0x000000)

    //Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 5))
    scene.add(camera)
}

function load() {
    //Wall
    let wallGeometry = new THREE.PlaneGeometry(100, 50, 10, 10)
    let wallMaterial = new THREE.MeshStandardMaterial({
        color: "white"
    })
    let wallMesh = new THREE.Mesh(wallGeometry, wallMaterial)
    wallMesh.position.set(0, 0, 0)
    scene.add(wallMesh)

    //Lights
    let ambientLight = new THREE.AmbientLight(0x030303, 1)
    scene.add(ambientLight)

    let spotLight1 = new THREE.SpotLight(0x9400FF, 0.5)
    spotLight1.position.set(2, -2, 7)
    spotLight1.target = wallMesh
    spotLight1.penumbra = 1
    spotLight1.distance = 0
    scene.add(spotLight1)

    let spotLight2 = new THREE.SpotLight(0xFF6A00, 0.5)
    spotLight2.position.set(-2, -2, 7)
    spotLight2.target = wallMesh
    spotLight2.penumbra = 1
    spotLight2.distance = 0
    scene.add(spotLight2)
}

function update() {
}

function render() {
	window.requestAnimationFrame(render)
	update()
	renderer.render(scene, camera)
}