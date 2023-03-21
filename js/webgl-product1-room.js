import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import { GLTFLoader } from "GLTFLoader"
import { AxesHelper } from "three"

//Global elements
let scene, camera, renderer
let cameraControls
let gltfLoader = new GLTFLoader()
let textureLoader = new THREE.TextureLoader()

init()
load()
render()

function init() {
    //Renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)
    renderer.gammaInput = true
    renderer.gammaOutput = true
    renderer.shadowMap.enabled = false
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
    camera.position.set(-8, 10, 13);
    camera.lookAt(new THREE.Vector3(-8, 10, 5))
    scene.add(camera)

    //Camera controls
    cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.target.set(-8, 10, 5)
    cameraControls.enabled = true
    cameraControls.enableDamping = true
    cameraControls.enablePan = false
    cameraControls.autoRotate = false
    cameraControls.autoRotateSpeed = 2
    cameraControls.maxDistance = 12
}

function load() {
    //SCENE

    //Scene Lights
    let sceneAmbientLight = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(sceneAmbientLight)

    //ROOM
    let room = new THREE.Object3D()
    scene.add(room)

    // Floor
    let floorGeometry = new THREE.BoxGeometry(40, 40, 1, 10, 10)
    let floorMaterial = new THREE.MeshStandardMaterial({
        color: "#898581",
        // map: textureLoader.load("../models/floor/Scene_Root_baseColor.png")
    });
    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
    floorMesh.rotation.x = -Math.PI / 2
    room.add(floorMesh)

    // Roof
    let roofGeometry = new THREE.BoxGeometry(40, 40, 1, 10, 10)
    let roofMaterial = new THREE.MeshStandardMaterial({
        color: "#98908A"
    });
    let roofMesh = new THREE.Mesh(roofGeometry, roofMaterial)
    roofMesh.position.set(0, 25, 0)
    roofMesh.rotation.x = -Math.PI / 2
    room.add(roofMesh)

    //Wall1
    let wallGeometry1 = new THREE.BoxGeometry(41, 26, 1, 10, 10)
    let wallMaterial1 = new THREE.MeshStandardMaterial({
        color: "#98908A"
    })
    let wallMesh1 = new THREE.Mesh(wallGeometry1, wallMaterial1)
    wallMesh1.position.set(0, 12.5, -20)
    room.add(wallMesh1)

    //Wall2
    let wallGeometry2 = new THREE.BoxGeometry(41, 26, 1, 10, 10)
    let wallMaterial2 = new THREE.MeshStandardMaterial({
        color: "#98908A"
    })
    let wallMesh2 = new THREE.Mesh(wallGeometry2, wallMaterial2)
    wallMesh2.position.set(20, 12.5, 0)
    wallMesh2.rotation.y = Math.PI / 2
    room.add(wallMesh2)

    //Wall3
    let wallGeometry3 = new THREE.BoxGeometry(41, 26, 1, 10, 10)
    let wallMaterial3 = new THREE.MeshStandardMaterial({
        color: "#98908A"
    })
    let wallMesh3 = new THREE.Mesh(wallGeometry3, wallMaterial3)
    wallMesh3.position.set(0, 12.5, 20)
    room.add(wallMesh3)

    //Wall4
    let wallGeometry4 = new THREE.BoxGeometry(41, 26, 1, 10, 10)
    let wallMaterial4 = new THREE.MeshStandardMaterial({
        color: "#98908A"
    })
    let wallMesh4 = new THREE.Mesh(wallGeometry4, wallMaterial4)
    wallMesh4.position.set(-20, 12.5, 0)
    wallMesh4.rotation.y = Math.PI / 2
    room.add(wallMesh4)

    //Door
    let door = new THREE.Object3D()
    gltfLoader.load("../models/door/scene.gltf", function (gltf) {
        door = gltf.scene
        door.position.set(-6, 0, -20.2)
        door.scale.multiplyScalar(10)
        room.add(door)
    }, undefined, function (error) {
        console.error(error)
    })

    //Empty shelf
    let emptyShelf = new THREE.Object3D()
    gltfLoader.load("../models/empty_shelf/scene.gltf", function (gltf) {
        emptyShelf = gltf.scene
        emptyShelf.rotation.y = Math.PI / 2
        emptyShelf.position.set(16, 0, 35)
        emptyShelf.scale.multiplyScalar(0.15)
        emptyShelf.add(new AxesHelper(50))
        room.add(emptyShelf)
    }, undefined, function (error) {
        console.error(error)
    })
    
    //Bookshelf
    let bookshelf = new THREE.Object3D()
    gltfLoader.load("../models/bookshelf/scene.gltf", function (gltf) {
        bookshelf = gltf.scene
        bookshelf.rotation.y = Math.PI
        bookshelf.position.set(16, 0, -13)
        bookshelf.scale.multiplyScalar(10)
        room.add(bookshelf)
    }, undefined, function (error) {
        console.error(error)
    })

    //Window
    let window = new THREE.Object3D()
    gltfLoader.load("../models/window/scene.gltf", function (gltf) {
        window = gltf.scene
        window.rotation.y = - Math.PI / 2
        window.position.set(-19.1, 12, 0)
        window.scale.multiplyScalar(0.1)
        room.add(window)
    }, undefined, function (error) {
        console.error(error)
    })

    //Room lights
    let roomSpotLightWall1 = new THREE.SpotLight(0x9400FF, 1)
    roomSpotLightWall1.position.set(0, 20, 0)
    roomSpotLightWall1.target = wallMesh1
    roomSpotLightWall1.penumbra = 1
    room.add(roomSpotLightWall1)

    let roomSpotLightWall2 = new THREE.SpotLight(0xFF6A00, 1.5)
    roomSpotLightWall2.position.set(-10, 20, 0)
    roomSpotLightWall2.target = wallMesh2
    roomSpotLightWall2.penumbra = 1
    room.add(roomSpotLightWall2)

    let roomSpotLightWall3 = new THREE.SpotLight(0x9400FF, 1)
    roomSpotLightWall3.position.set(0, 20, 5)
    roomSpotLightWall3.target = wallMesh3
    roomSpotLightWall3.penumbra = 1
    room.add(roomSpotLightWall3)

    let roomSpotLightWall4 = new THREE.SpotLight(0x0E0AF8, 1.5)
    roomSpotLightWall4.position.set(10, 20, 0)
    roomSpotLightWall4.target = wallMesh4
    roomSpotLightWall4.penumbra = 1
    room.add(roomSpotLightWall4)

    //DESK
    let desk = new THREE.Object3D()
    desk.position.set(-6, 0, 5)
    room.add(desk)

    //Table
    let table = new THREE.Object3D()
    gltfLoader.load("../models/table/scene.gltf", function (gltf) {
        table = gltf.scene
        table.position.set(-5.5, 0, 13)
        table.scale.multiplyScalar(10)
        desk.add(table)
    }, undefined, function (error) {
        console.error(error)
    })

    //Chair
    let chair = new THREE.Object3D()
    gltfLoader.load("../models/chair/scene.gltf", function (gltf) {
        chair = gltf.scene
        chair.rotation.y = Math.PI
        chair.position.set(-2, 0.5, 8)
        chair.scale.multiplyScalar(10)
        desk.add(chair)
    }, undefined, function (error) {
        console.log(error)
    })

    //Laptop
    let laptop = new THREE.Object3D()
    gltfLoader.load("../models/gaming_laptop/scene.gltf", function (gltf) {
        laptop = gltf.scene
        laptop.rotation.y = - Math.PI / 2
        laptop.position.set(-2, 7.43, 0.3)
        desk.add(laptop)
    }, undefined, function (error) {
        console.error(error)
    })

    //Desk lights
    let deskSpotLight1 = new THREE.SpotLight(0xffffff, 5)
    deskSpotLight1.position.set(-2, 15, 3)
    deskSpotLight1.target = laptop
    deskSpotLight1.penumbra = 1
    deskSpotLight1.distance = 20
    desk.add(deskSpotLight1)

    let deskSpotLight2 = new THREE.SpotLight(0xffffff, 2)
    deskSpotLight2.position.set(-10, 8, 0)
    deskSpotLight2.target = laptop
    deskSpotLight2.penumbra = 1
    deskSpotLight2.distance = 10
    desk.add(deskSpotLight2)

    let deskSpotLight3 = new THREE.SpotLight(0xffffff, 2)
    deskSpotLight3.position.set(8, 8, 0)
    deskSpotLight3.target = laptop
    deskSpotLight3.penumbra = 1
    deskSpotLight3.distance = 10
    desk.add(deskSpotLight3)
}

function update() {
    cameraControls.update()
}

function render() {
    window.requestAnimationFrame(render)
    update()
    renderer.render(scene, camera)
}