<template>
  <div>
    <el-select v-model="selFile"
               style="position:absolute;z-index:9999;left:10px;top:10px"
               size="small"
               @change="onFileChange">
      <el-option v-for="file in files"
                 :key="file"
                 :label="file"
                 :value="file">
      </el-option>
    </el-select>
    <div id="three3d"
         ref="three3d"
         v-loading="loading"
         class="three-3d"
         element-loading-text="数据加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="#212c45">
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { ArcballControls } from 'three/addons/controls/ArcballControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Delaunator from 'delaunator'
function splitArrayIntoChunks(array, chunkSize) {
  // 存储结果的数组
  const result = []
  // 循环遍历数组，步长为chunkSize
  for (let i = 0; i < array.length; i += chunkSize) {
    // 使用slice方法从数组中提取子数组，并将其添加到结果数组中
    result.push(array.slice(i, i + chunkSize))
  }
  // 返回包含拆分后的小数组的结果数组
  return result
}
export default {
  data() {
    return {
      loading: false,
      selFile: '/data/12/12_000003.pcd',
      files: [
        '/data/data.pcd',
        '/data/mc/12_000000.pcd',
        '/data/mc/12_000001.pcd',
        '/data/mc/12_000002.pcd',
        '/data/mc/12_000003.pcd',
        '/data/mc/12_000004.pcd',
        '/data/mc/12_000005.pcd',
        '/data/mc/12_000006.pcd',
        '/data/mc/12_000007.pcd',
        '/data/mc/12_000008.pcd',
        '/data/mc/12_000009.pcd',
        '/data/mc/12_000010.pcd',
        '/data/mc/12_000011.pcd',
        '/data/full_points.pcd',
        '/data/test.pcd'
      ]
    }
  },
  methods: {
    onFileChange() {
      // const loader = new PCDLoader()
      const selFile = this.selFile
      // this.loader = loader
      this.loading = true
      this.loader.load(`${selFile}`, points => {
        this.processPointCloud(points)
      })
    },
    threejs() {
      this.loading = true
      const width = window.innerWidth
      const height = window.innerHeight
      // init
      // const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
      const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 10
      this.camera = camera

      const scene = new THREE.Scene()

      //   const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      //   const material = new THREE.MeshNormalMaterial()

      //   const mesh = new THREE.Mesh(geometry, material)
      //   scene.add(mesh)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      renderer.setAnimationLoop(animation)
      this.renderer = renderer

      //   // 添加鼠标控制
      //   const controls = new OrbitControls(camera, renderer.domElement)
      //   // controls.minDistance = 100
      //   // 设置最大距离（例如，相机不能离目标点远于 500 个单位）
      //   // controls.maxDistance = 1000
      //   controls.enableDamping = true
      //   controls.distance = 10
      //   controls.dampingFactor = 0.05
      //   controls.enableZoom = true
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.addEventListener('change', () => renderer.render(scene, camera))

      /*
      const controls2 = new ArcballControls(camera, renderer.domElement, scene)
      controls2.addEventListener('change', () => {
        renderer.render(scene, camera)
      })
      this.controls2 = controls2
      */
      // 创建一个点光源
      const pointLight = new THREE.PointLight(0xff0, 1000, 10)
      pointLight.position.set(1000, 100, 100)
      scene.add(pointLight)
      // 创建一个环境光源
      const ambientLight = new THREE.AmbientLight(0xff0) // 弱白光
      ambientLight.position.set(1000, 100, 100)
      scene.add(ambientLight)
      this.scene = scene
      // document.body.appendChild(renderer.domElement)

      // animation /data/full_points.pcd
      const loader = new PCDLoader()
      const selFile = this.selFile
      this.loader = loader
      loader.load(`${selFile}`, points => {
        this.processPointCloud(points)
        // this.processMesh(points)
      })

      const container = this.$refs.three3d
      if (container) {
        container.appendChild(renderer.domElement)
      }

      function animation(time) {
        controls.update()
        renderer.render(scene, camera)
      }
      // 动态调整窗口大小
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
      })
    },
    processMesh(points) {
      const camera = this.camera
      const scene = this.scene
      // 假设你已经有了一个包含点云的数组 points
      // 计算点云的边界盒
      // points.rotation.y = -Math.PI / 2
      const boundingBox = new THREE.Box3().setFromObject(points)
      // 获取边界盒的中心
      const center = boundingBox.getCenter(new THREE.Vector3())
      console.error(center)
      if (this.cube) {
        scene.remove(this.cube)
      }
      points.position.sub(center)
      // 调整相机位置和焦点
      //   camera.position.x = center.x + center.x * 2 //center.x + center.x * 0.5
      //   camera.position.y = center.y //center.y + center.y * 0.5
      camera.position.set(center.x, center.y, center.z)
      camera.lookAt(center)

      const geometry2 = new THREE.BoxGeometry()
      const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry2, material2)
      cube.position.set(center.x, center.y, center.z + 10)
      scene.add(cube)
      this.cube = cube
      let vertices = []

      const positions = points.geometry.attributes.position.array
      //   console.error(positions)
      //   positions.forEach(point => {
      //     vertices.push(point.x, point.y, point.z)
      //   })
      vertices = positions
      // 使用 Delaunator 进行三角剖分
      const delaunay = new Delaunator(vertices)
      const triangles = delaunay.triangles
      console.error(vertices)
      console.error(triangles)
      // 创建几何体并添加顶点和面
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      const indices = []
      for (let i = 0; i < triangles.length; i += 3) {
        indices.push(triangles[i], triangles[i + 1], triangles[i + 2])
      }
      geometry.setIndex(indices)
      geometry.computeVertexNormals()

      // 创建材质和网格
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
      const pointCloud = new THREE.Mesh(geometry, material)

      // 添加到场景

      this.setAxes({ x: center.x, y: center.y, z: center.z + 10 })
      if (this.pointCloud) {
        scene.remove(this.pointCloud)
      }
      this.pointCloud = pointCloud
      scene.add(pointCloud)
      this.renderer && this.renderer.render(scene, camera)
      this.loading = false
    },
    processPointCloud(points) {
      const camera = this.camera
      const scene = this.scene
      // 计算点云的边界盒
      // points.rotation.y = -Math.PI / 2
      const boundingBox = new THREE.Box3().setFromObject(points)
      // 获取边界盒的中心
      const center = boundingBox.getCenter(new THREE.Vector3())
      console.error(center)
      if (this.cube) {
        scene.remove(this.cube)
      }
      points.position.sub(center)
      // 调整相机位置和焦点
      //   camera.position.x = center.x + center.x * 2 //center.x + center.x * 0.5
      //   camera.position.y = center.y //center.y + center.y * 0.5
      camera.position.set(center.x, center.y, center.z)
      camera.lookAt(center)

      // 根据需要，可以在这里添加更多属性或进行数据转换
      // 创建点云材质
      // const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: THREE.VertexColors })
      const material = new THREE.PointsMaterial({ color: 0xfff000, size: 0.01 })
      // 创建点云并添加到场景
      const geometry = new THREE.BufferGeometry()
      // 假设点云对象具有位置和可选的颜色属性
      const positions = points.geometry.attributes.position
      console.error(positions.array.length)
      geometry.setAttribute('position', new THREE.BufferAttribute(positions.array, positions.itemSize))
      if (points.geometry.attributes.color) {
        const colors = points.geometry.attributes.color
        geometry.setAttribute('color', new THREE.BufferAttribute(colors.array, colors.itemSize))
      }
      const pointCloud = new THREE.Points(geometry, material)
      if (this.pointCloud) {
        scene.remove(this.pointCloud)
      }
      this.pointCloud = pointCloud
      // this.controls2.setCamera(camera)
      this.setAxes({ x: center.x, y: center.y, z: center.z + 10 })
      scene.add(pointCloud)
      this.renderer && this.renderer.render(scene, camera)
      this.loading = false
    },
    setAxes({ x, y, z }) {
      // 加载字体并创建文字
      const scene = this.scene
      const fontLoader = new FontLoader()
      fontLoader.load('/three/fonts/helvetiker_regular.typeface.json', font => {
        // 创建坐标轴
        if (this.axes) {
          this.scene.remove(this.axes)
        }
        const axes = new THREE.AxesHelper(2) // 参数为轴的大小
        axes.position.set(x, y, z)
        scene.add(axes)
        this.axes = axes

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const textOptions = {
          font: font,
          size: 0.1,
          height: 0.01
        }

        // X轴文字
        if (this.textMeshX) {
          this.scene.remove(this.textMeshX)
        }
        const textGeometryX = new TextGeometry('X', textOptions)
        const textMeshX = new THREE.Mesh(textGeometryX, textMaterial)
        textMeshX.position.set(x + 2.1, y + 0, z + 0)
        scene.add(textMeshX)
        this.textMeshX = textMeshX

        // Y轴文字
        if (this.textMeshY) {
          this.scene.remove(this.textMeshY)
        }
        const textGeometryY = new TextGeometry('Y', textOptions)
        const textMeshY = new THREE.Mesh(textGeometryY, textMaterial)
        textMeshY.position.set(x + 0, y + 2.1, z + 0)
        scene.add(textMeshY)
        this.textMeshY = textMeshY

        // Z轴文字
        if (this.textMeshZ) {
          this.scene.remove(this.textMeshZ)
        }
        const textGeometryZ = new TextGeometry('Z', textOptions)
        const textMeshZ = new THREE.Mesh(textGeometryZ, textMaterial)
        textMeshZ.position.set(x + 0, y + 0, z + 2.1)
        scene.add(textMeshZ)
        this.textMeshZ = textMeshZ
      })
    }
  },
  mounted() {
    this.threejs()
  }
}
</script>

<style lang="scss" scoped>
.three-3d {
  width: 100vw;
  height: 100vh;
  position: relative;
}
#three3d {
  width: 100vw;
  height: 100vh;
}

:deep(.el-input__inner) {
  background-color: transparent;
}
</style>