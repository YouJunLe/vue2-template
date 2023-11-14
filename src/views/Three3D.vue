<template>
  <div id="three3d"
       ref="three3d"
       class="three-3d">
  </div>
</template>

<script>
import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  methods: {
    threejs() {
      const width = window.innerWidth
      const height = window.innerHeight
      // init
      // const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 10

      const scene = new THREE.Scene()

      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const material = new THREE.MeshNormalMaterial()

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      renderer.setAnimationLoop(animation)

      // 添加鼠标控制
      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.minDistance = 100

      // 设置最大距离（例如，相机不能离目标点远于 500 个单位）
      // controls.maxDistance = 1000
      controls.enableDamping = true
      controls.distance = 10
      controls.dampingFactor = 0.05
      controls.enableZoom = true

      // 创建一个点光源
      const pointLight = new THREE.PointLight(0xf00, 1000, 10)
      pointLight.position.set(1000, 100, 100)
      scene.add(pointLight)

      // 创建一个环境光源
      const ambientLight = new THREE.AmbientLight(0xf00) // 弱白光
      ambientLight.position.set(1000, 100, 100)
      scene.add(ambientLight)
      // document.body.appendChild(renderer.domElement)

      // animation /data/full_points.pcd
      const loader = new PCDLoader()

      loader.load('/data/full_points.pcd', points => {
        this.processPointCloud(scene, points)
      })

      const container = this.$refs.three3d
      if (container) {
        container.appendChild(renderer.domElement)
      }

      function animation(time) {
        mesh.rotation.x = time / 2000
        mesh.rotation.y = time / 1000
        controls.update()
        renderer.render(scene, camera)
      }
    },
    processPointCloud(scene, points) {
      const geometry = new THREE.BufferGeometry()
      // 假设点云对象具有位置和可选的颜色属性
      const positions = points.geometry.attributes.position
      geometry.setAttribute('position', new THREE.BufferAttribute(positions.array, positions.itemSize))
      if (points.geometry.attributes.color) {
        const colors = points.geometry.attributes.color
        geometry.setAttribute('color', new THREE.BufferAttribute(colors.array, colors.itemSize))
      }
      // 根据需要，可以在这里添加更多属性或进行数据转换
      // 创建点云材质
      // const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: THREE.VertexColors })
      const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.01 })
      // 创建点云并添加到场景
      const pointCloud = new THREE.Points(geometry, material)
      scene.add(pointCloud)
    }
  },
  mounted() {
    this.threejs()
  }
}
</script>

<style lang="scss" scoped>
#three3d {
  width: 100vw;
  height: 100vh;
}
</style>