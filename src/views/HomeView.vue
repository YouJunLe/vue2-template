<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png"
         style="width:200px" />
    <el-divider content-position="right">multi-select 组件</el-divider>
    <div style="width: 350px">
      <label class="typo__label">Single select / dropdown</label>
      <multi-select v-model="value"
                    deselect-label="Can't remove this value"
                    track-by="name"
                    label="name"
                    placeholder="Select one"
                    :options="options"
                    :searchable="false"
                    :allow-empty="false">
        <template slot="singleLabel"
                  slot-scope="{ option }">
          <strong>{{ option.name }}</strong> is written in
          <strong>{{ option.language }}</strong>
        </template>
      </multi-select>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>
    <el-divider content-position="right">el-selec 组件</el-divider>
    value: {{value}}
    <div>
      <el-select v-model="value"
                 clearable
                 value-key="name"
                 placeholder="请选择"
                 @change="onChange">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.name"
                   :disabled="item.$isDisabled"
                   :value="item">
        </el-option>
      </el-select>
    </div>
    <el-divider content-position="right">HelloWorld 组件</el-divider>
    <HelloWorld msg="Welcome to Your Vue.js App"
                data-al="cdd" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      value: null,
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP', $isDisabled: true },
        { name: 'Phoenix', language: 'Elixir' }
      ]
    }
  },
  methods: {
    onChange() {
      const value = JSON.stringify(this.value)
      this.console.log(value)
      this.console.warn(value)
      this.console.error(value)
      this.console.debug(value)
      this.console.success(value)
      this.console.stress(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>