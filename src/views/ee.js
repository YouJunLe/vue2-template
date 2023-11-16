var externalSettings = {
  updateCheck: true,
  requestTimeout: 30000,
  videoToken: '3e80d1762a324d5b0ff636e0bd16f1e3',
  server: {
    omsUrl: 'https://www.sensorcmd.com/omsapi',
    domsUrl: 'https://www.sensorcmd.com/domsapi/api/v1',
    domsUrl2: 'https://www.sensorcmd.com/domsapi/api/v1',
    url: 'https://www.sensorcmd.com/cmdapi/api/v1',
    ucUrl: 'https://www.sensorcmd.com/ucapi/api/v1',
    javaApi1: 'https://www.sensorcmd.com/javaapi/',
    humanCheckUrl: 'https://www.sensorcmd.com/human/',
    cmdJavaApi: 'https://www.sensorcmd.com/cmdjavaapi/',
    axleloadApi: 'https://www.sensorcmd.com/loadapi/',
    modalUrl: 'https://www.sensorcmd.com/cmdapi/api/v1',
    cmdUrl: 'https://www.sensorcmd.com/cmdapi/api/v1',
    socketUrl: 'wss://www.sensorcmd.com/wsrt/realtime',
    fileSys: 'https://www.sensorcmd.com/fsapi/api/v1',
    previewUrl: 'http://kk.sensorcmd.com',
    RealVideoUrl: 'https://www.sensorcmd.com/video1/',
    RealVideoBaseHost: 'www.sensorcmd.com/video1',
    selfVideoPlatform: 'https://www.sensorcmd.com/video5',
    RealVideoConfigMap: {
      'ali-1': {
        HostArray: [
          'www.sensorcmd.com/video1/',
          'www.sensorcmd.com/video2/',
          'www.sensorcmd.com/video3/',
          'www.sensorcmd.com/video4/'
        ],
        VideoPro: 'https',
        VideoPath: 'aliRealVideo'
      }
    },
    DID: 'D52069380',
    graphqlUrl: 'https://www.sensorcmd.com/trafficapi/v1/graphql',
    virtualModules: [
      'LZHCF2000',
      'HCF1100',
      'Correlation_Analysis',
      'Modal_Analysis',
      'Anemorumbometer',
      'VibraCable',
      'VirtualTanAngle'
    ],
    relativeModules: ['HCF700_485_Naodu'],
    register_hosts: ['sdgs', 'cyglzhjc', 'lzdz', 'fgdz', 'lsdz', 'yddz', 'sjzsl', 'bhms', 'jyhcmd'],
    selfVideoPlatform: 'http://47.100.108.245:8080',
    homePage: {
      bhms: 'https://www.zdjtcm.com/',
      sdgs: 'https://www.sdhsg.com/index'
    }
  },
  serverEnv: {
    nodeImport: 'python'
  },
  // 检测系统
  checkSystem: {
    codeNames: ['wxrhdq']
  },
  bimServer: {
    bimHost: 'https://www.sensorcmd.com/bim/',
    bimDatabase: 't77399badb4c4a81accfca934c255c8c'
  },
  secret: {
    graphq_secret: '1qaz2wsx',
    CLIENT_ID: '05e25758-0aa4-11ea-ba34-0242ac10011f',
    CLIENT_SECRET: '71519470-0b32-11ea-ba34-0242ac10011f'
  }
}
localStorage.externalSettings = JSON.stringify(externalSettings)
