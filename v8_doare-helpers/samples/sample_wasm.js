function utf8ToString(h, p) {
  let s = "";
  for (i = p; h[i]; i++) {
    s += String.fromCharCode(h[i]);
  }
  return s;
}

function test() {
  var wasmImports = {
    env: {
      puts: function puts (index) {
        print(utf8ToString(h, index));
      }
    }
  };
  var buffer = new Uint8Array([0,97,115,109,1,0,0,0,1,137,128,128,128,0,2,
    96,1,127,1,127,96,0,0,2,140,128,128,128,0,1,3,101,110,118,4,112,117,
    116,115,0,0,3,130,128,128,128,0,1,1,4,132,128,128,128,0,1,112,0,0,5,
    131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,146,128,128,128,0,2,6,
    109,101,109,111,114,121,2,0,5,104,101,108,108,111,0,1,10,141,128,128,
    128,0,1,135,128,128,128,0,0,65,16,16,0,26,11,11,146,128,128,128,0,1,0,
    65,16,11,12,72,101,108,108,111,32,87,111,114,108,100,0]);
  let m = new WebAssembly.Instance(new WebAssembly.Module(buffer),wasmImports);
  let h = new Uint8Array(m.exports.memory.buffer);
  return m.exports.hello;
}

global_test = test();
