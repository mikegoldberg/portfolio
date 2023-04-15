import { Point } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { BufferAttribute } from "three";

/*
  THREE.ImageUtils.crossOrigin = "Anonymous";
  var step = 0,
      pass = 0,
      orbit,
      attributes,
      pSize,
      pOpacity,
      psMat2,
      mesh,
      ps;
  
  var scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
            
  var renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor( new THREE.Color( 0x000000, 1.0 ) );
  renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.shadowMapEnabled = true;
  
  var cpos = 4;
  
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = cpos;
  camera.lookAt( scene.position );
  
  function setupParticleSystem(x,y) {
    var geometry = new THREE.Geometry();
    pSize = [];
    pOpacity = [];
    for (var i=0; i<x; i++) {
      for (var j=0; j<y; j++) {
        var v = new THREE.Vector3();
        v.x = i/20;
        v.y = 0;
        v.z = j/20;
        geometry.vertices.push( v );
        geometry.colors.push( new THREE.Color( v.y, 0.5, 0.7 ) );
        pSize.push( Math.random() );
        pOpacity.push( Math.random() / 4+0.5 );
      }
    }
    
    ps = createPointCloud( geometry );
    ps.position.x -= x/20;
    ps.position.z -= x/20;
    
    scene.add( ps );
    
    console.log(ps);
  }
  
  setupParticleSystem(10,100);
  render();
  
  function generateSprite() {
    var canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(0, 0,1,1)');
    gradient.addColorStop(0.1, 'rgba(0,0,1,1)');
    gradient.addColorStop(0.9, 'rgba(0,1, 1,1)');
    gradient.addColorStop(1.0, 'rgba(0,0,0,1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  
  function createPointCloud(geom) {
    var material = new THREE.PointCloudMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: generateSprite()
      });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
  }
  
  function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    
    pass++;
    step += 0.002;
    var count = 0;
    var geometry = ps.geometry;
    geometry.vertices.forEach(function(v){
        v.y = ( Math.sin( (v.x/2+step) * Math.PI*2 )
              + Math.cos( (v.z/2+step*2) * Math.PI )
              + Math.sin( (v.x+v.y+step*2) / 4*Math.PI ) ) / 8;
    });
    
    geometry.verticesNeedUpdate = true;    
  }
*/

const Scene = () => {
  // const { nodes, materials } = useGLTF('/Poimandres.gltf');

  // var geometry = new THREE.Geometry();
  // pSize = [];
  // pOpacity = [];
  // for (var i=0; i<x; i++) {
  //   for (var j=0; j<y; j++) {
  //     var v = new THREE.Vector3();
  //     v.x = i/20;
  //     v.y = 0;
  //     v.z = j/20;
  //     geometry.vertices.push( v );
  //     geometry.colors.push( new THREE.Color( v.y, 0.5, 0.7 ) );
  //     pSize.push( Math.random() );
  //     pOpacity.push( Math.random() / 4+0.5 );
  //   }
  return (
    <Suspense fallback={null}>
      {/* <primitive object={gltf.scene} /> */}
      {/* <mesh castShadow receiveShadow geometry={geometry} /> */}
      <mesh>
        <bufferGeometry
          attributes={{
            position: new BufferAttribute(
              new Float32Array([
                -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
              ]),
              3
            ),
          }}
        />
        <meshBasicMaterial color={"#f00"} />
      </mesh>
    </Suspense>
  );
};

const Aurora = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 300,
        background: "green",
        zIndex: 1000,
      }}
      camera={{ position: [0, 0, 12], fov: 15 }}
    >
      <Scene />
    </Canvas>
  );
};

export default Aurora;
