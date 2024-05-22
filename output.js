function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);
  }
  return _createClass(EventDispatcher, null, [{
    key: "addListener",
    value: function addListener(event, callback) {
      var arr = this.listeners.get(event);
      if (!arr) {
        this.listeners.set(event, [callback]);
      } else {
        arr.push(callback);
      }
    }
  }, {
    key: "remove",
    value: function remove(event, callback) {
      var arr = this.listeners.get(event);
      if (callback) {
        var index = arr.indexOf(callback);
        if (index != -1) {
          arr = arr.splice(0, index).concat(arr.splice(index, arr.length));
          this.listeners.set(event, arr);
        }
      } else {
        this.listeners.set(event, []);
      }
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this.listeners.clear();
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      var arr = this.listeners.get(event);
      arr && arr.forEach(function (cb) {
        cb(data);
      });
    }
  }]);
}();
_defineProperty(EventDispatcher, "listeners", new Map());

var Networking = /*#__PURE__*/function () {
  function Networking() {
    _classCallCheck(this, Networking);
  }
  return _createClass(Networking, [{
    key: "start",
    value: function start() {
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA1, {
          name: 'This is data1',
          value: 0
        });
      }, 5000);
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA1, {
          name: 'This is data1 updated',
          value: 123
        });
      }, 15000);
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA2, {
          name: 'This is data2',
          value: 'first time111111'
        });
      }, 10000);
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA2, {
          name: 'This is data2',
          value: 'first time222222'
        });
      }, 15000);
    }
  }]);
}();
var NetworkingEvents;
(function (NetworkingEvents) {
  NetworkingEvents["DATA1"] = "DATA1";
  NetworkingEvents["DATA2"] = "DATA2";
})(NetworkingEvents || (NetworkingEvents = {}));

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function bind(binder) {
  return function (target, key) {
    target[MakeBindKey(key)] = null;
    target[MakeBinderKey(key)] = binder;
  };
}
function bindable(target, key) {
  target[MakeBindableKey(key)] = null;
}
var MakeBindKey = function MakeBindKey(key) {
  return '_bind_' + key + '_bind_';
};
var MakeBinderKey = function MakeBinderKey(key) {
  return '_binder_' + key + '_binder_';
};
var MakeBindableKey = function MakeBindableKey(key) {
  return '_bindable_' + key + '_bindable_';
};
var BindRegExp = /^_bind_([a-zA-Z][a-zA-Z0-9]*)_bind_$/;
var BindableRegExp = /^_bindable_([a-zA-Z][a-zA-Z0-9]*)_bindable_$/;
function UseViewModel(VMClass) {
  return function (target) {
    var vmInstance = new VMClass(target);
    vmInstance.startBinding();
    target['__comp__vm__'] = vmInstance;
  };
}

var ViewModel = /*#__PURE__*/function () {
  function ViewModel(comp) {
    _classCallCheck(this, ViewModel);
    _defineProperty(this, "dependent", void 0);
    _defineProperty(this, "dependentClass", void 0);
    if (Object.getPrototypeOf(comp) != View) {
      throw new Error('UseViewModel can only apply on those who inherits View');
    }
    this.dependentClass = comp;
  }
  return _createClass(ViewModel, [{
    key: "startBinding",
    value: function startBinding() {
      var _this = this;
      var keys = Object.keys(Object.getPrototypeOf(this));
      keys.forEach(function (k) {
        if (BindableRegExp.test(k)) {
          var retrieveKey = BindableRegExp.exec(k)[1];
          _this[k] = _this[retrieveKey];
          Object.defineProperty(_this, retrieveKey, {
            set: function set(newVal) {
              var prev = this[k];
              if (prev == newVal) {
                return;
              }
              this[k] = newVal;
              this.dependent && this.dependent.isValid && this.dependent.modelDidChange(retrieveKey, newVal, prev);
            },
            get: function get() {
              return this[k];
            },
            configurable: true,
            enumerable: true
          });
        }
      });
    }
  }, {
    key: "componentLoaded",
    value: function componentLoaded(comp) {
      this.dependent = comp;
      if (this.dependent.constructor.name != this.dependentClass.name) {
        throw new Error("Component is loaded into ViewModel but did not match Class name which was originally set. \n                ".concat(this.dependent.constructor.name, " and ").concat(this.dependentClass.name, " not match."));
      }
    }
  }]);
}();

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var View = /*#__PURE__*/function (_cc$Component) {
  function View() {
    var _this;
    _classCallCheck(this, View);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, View, [].concat(args));
    _defineProperty(_this, "dependentDestroyed", void 0);
    _defineProperty(_this, "viewModel", void 0);
    _defineProperty(_this, "keysWithBinder", void 0);
    return _this;
  }
  _inherits(View, _cc$Component);
  return _createClass(View, [{
    key: "onLoad",
    value: function onLoad() {
      var _this2 = this;
      this.viewModel = this.constructor['__comp__vm__'];
      this.viewModel.componentLoaded(this);
      this.keysWithBinder = new Map();
      var checkIfOneVm;
      var toBeBounded = [];
      var keys = Object.keys(this);
      keys.forEach(function (k) {
        if (_this2[k] instanceof ViewModel) {
          if (!checkIfOneVm) {
            checkIfOneVm = _this2[k];
          } else {
            throw new Error("No more than one ViewModel for a component! \n ViewModel key=".concat(k, " is prohibited!"));
          }
        }
      });
      var keysOfPrototype = Object.keys(Object.getPrototypeOf(this));
      keysOfPrototype.forEach(function (k) {
        if (BindRegExp.test(k)) {
          toBeBounded.push(k);
        }
      });
      this.viewModel && this.startBinding(this.viewModel, toBeBounded);
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      this.dependentDestroyed = true;
    }
  }, {
    key: "startBinding",
    value: function startBinding(vm, properties) {
      var _this3 = this;
      var prototype = Object.getPrototypeOf(this);
      properties.forEach(function (k) {
        var originKey = BindRegExp.exec(k) ? BindRegExp.exec(k)[1] : '';
        var vmKey = MakeBindableKey(originKey);
        if (!("".concat(vmKey) in vm)) {
          throw new Error("Did not find bindable key=".concat(vmKey, " in the ViewModel!"));
        }
        Object.defineProperty(_this3, originKey, {
          get: function get() {
            return vm[originKey];
          },
          configurable: false,
          enumerable: false
        });
        var binder = prototype[MakeBinderKey(originKey)];
        _this3.keysWithBinder.set(originKey, binder);
        if (binder && vm[originKey]) {
          _this3.executeBinding(binder, k, vm[originKey]);
        }
      });
    }
  }, {
    key: "executeBinding",
    value: function executeBinding(binder, key, value) {
      var isSetter = !binder.includes('()');
      if (isSetter) {
        try {
          switch (_typeof(value)) {
            case 'undefined':
            case 'boolean':
            case 'number':
              eval("".concat(binder, "=").concat(value));
              break;
            case 'string':
              eval("".concat(binder, "='").concat(value, "'"));
              break;
            case 'object':
              eval("".concat(binder, "=value"));
              break;
            default:
              throw new Error("@bind did not support this type: ".concat(_typeof(value)));
          }
        } catch (e) {
          console.error("modelDidChange error occurred while executing ".concat(binder, " for key:").concat(key, " and value:").concat(value), e);
        }
      } else {
        try {
          eval(binder.replace('()', '(value)'));
        } catch (e) {
          console.error("modelDidChange error occurred while executing ".concat(binder, " for key:").concat(key, " and value:").concat(value), e);
        }
      }
    }
  }, {
    key: "modelDidChange",
    value: function modelDidChange(key, value, previousValue) {
      if (!this.keysWithBinder) {
        return;
      }
      var binder = this.keysWithBinder.get(key);
      if (binder) {
        this.executeBinding(binder, key, value);
      }
    }
  }]);
}(cc.Component);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike  ) { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function encodePerson(message) {
  var bb = popByteBuffer();
  _encodePerson(message, bb);
  return toUint8Array(bb);
}
function _encodePerson(message, bb) {
  var $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }
  var $age = message.age;
  if ($age !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($age));
  }
  var array$hobbies = message.hobbies;
  if (array$hobbies !== undefined) {
    var _iterator = _createForOfIteratorHelper(array$hobbies),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var value = _step.value;
        writeVarint32(bb, 26);
        writeString(bb, value);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var $membership = message.membership;
  if ($membership !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeMembership($membership, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodePerson(binary) {
  return _decodePerson(wrapByteBuffer(binary));
}
function _decodePerson(bb) {
  var message = {};
  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      case 1:
        {
          message.name = readString(bb, readVarint32(bb));
          break;
        }
      case 2:
        {
          message.age = readVarint32(bb);
          break;
        }
      case 3:
        {
          var values = message.hobbies || (message.hobbies = []);
          values.push(readString(bb, readVarint32(bb)));
          break;
        }
      case 4:
        {
          var limit = pushTemporaryLength(bb);
          message.membership = _decodeMembership(bb);
          bb.limit = limit;
          break;
        }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  if (message.name === undefined) throw new Error("Missing required field: name");
  if (message.age === undefined) throw new Error("Missing required field: age");
  if (message.membership === undefined) throw new Error("Missing required field: membership");
  return message;
}
function encodePersons(message) {
  var bb = popByteBuffer();
  _encodePersons(message, bb);
  return toUint8Array(bb);
}
function _encodePersons(message, bb) {
  var array$persons = message.persons;
  if (array$persons !== undefined) {
    var _iterator2 = _createForOfIteratorHelper(array$persons),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var value = _step2.value;
        writeVarint32(bb, 10);
        var nested = popByteBuffer();
        _encodePerson(value, nested);
        writeVarint32(bb, nested.limit);
        writeByteBuffer(bb, nested);
        pushByteBuffer(nested);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}
function decodePersons(binary) {
  return _decodePersons(wrapByteBuffer(binary));
}
function _decodePersons(bb) {
  var message = {};
  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      case 1:
        {
          var limit = pushTemporaryLength(bb);
          var values = message.persons || (message.persons = []);
          values.push(_decodePerson(bb));
          bb.limit = limit;
          break;
        }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeMembership(message) {
  var bb = popByteBuffer();
  _encodeMembership(message, bb);
  return toUint8Array(bb);
}
function _encodeMembership(message, bb) {
  var $plan = message.plan;
  if ($plan !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($plan));
  }
  var $expiration = message.expiration;
  if ($expiration !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $expiration);
  }
}
function decodeMembership(binary) {
  return _decodeMembership(wrapByteBuffer(binary));
}
function _decodeMembership(bb) {
  var message = {};
  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      case 1:
        {
          message.plan = readVarint32(bb);
          break;
        }
      case 2:
        {
          message.expiration = readString(bb, readVarint32(bb));
          break;
        }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  if (message.plan === undefined) throw new Error("Missing required field: plan");
  if (message.expiration === undefined) throw new Error("Missing required field: expiration");
  return message;
}
function pushTemporaryLength(bb) {
  var length = readVarint32(bb);
  var limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}
function skipUnknownField(bb, type) {
  switch (type) {
    case 0:
      while (readByte(bb) & 0x80) {}
      break;
    case 2:
      skip(bb, readVarint32(bb));
      break;
    case 5:
      skip(bb, 4);
      break;
    case 1:
      skip(bb, 8);
      break;
    default:
      throw new Error("Unimplemented type: " + type);
  }
}
var f32 = new Float32Array(1);
new Uint8Array(f32.buffer);
var f64 = new Float64Array(1);
new Uint8Array(f64.buffer);
function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0
  };
}
var bbStack = [];
function popByteBuffer() {
  var bb = bbStack.pop();
  if (!bb) return {
    bytes: new Uint8Array(64),
    offset: 0,
    limit: 0
  };
  bb.offset = bb.limit = 0;
  return bb;
}
function pushByteBuffer(bb) {
  bbStack.push(bb);
}
function wrapByteBuffer(bytes) {
  return {
    bytes: bytes,
    offset: 0,
    limit: bytes.length
  };
}
function toUint8Array(bb) {
  var bytes = bb.bytes;
  var limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}
function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}
function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}
function grow(bb, count) {
  var bytes = bb.bytes;
  var offset = bb.offset;
  var limit = bb.limit;
  var finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    var newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}
function advance(bb, count) {
  var offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}
function readString(bb, count) {
  var offset = advance(bb, count);
  var fromCharCode = String.fromCharCode;
  var bytes = bb.bytes;
  var invalid = "\uFFFD";
  var text = '';
  for (var i = 0; i < count; i++) {
    var c1 = bytes[i + offset],
      c2 = void 0,
      c3 = void 0,
      c4 = void 0,
      c = void 0;
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    } else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;else {
          c = (c1 & 0x1F) << 6 | c2 & 0x3F;
          if (c < 0x80) text += invalid;else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    } else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | c3 << 8) & 0xC0C0) !== 0x8080) text += invalid;else {
          c = (c1 & 0x0F) << 12 | (c2 & 0x3F) << 6 | c3 & 0x3F;
          if (c < 0x0800 || c >= 0xD800 && c <= 0xDFFF) text += invalid;else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    } else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | c3 << 8 | c4 << 16) & 0xC0C0C0) !== 0x808080) text += invalid;else {
          c = (c1 & 0x07) << 0x12 | (c2 & 0x3F) << 0x0C | (c3 & 0x3F) << 0x06 | c4 & 0x3F;
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    } else text += invalid;
  }
  return text;
}
function writeString(bb, text) {
  var n = text.length;
  var byteCount = 0;
  for (var i = 0; i < n; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);
  var offset = grow(bb, byteCount);
  var bytes = bb.bytes;
  for (var _i = 0; _i < n; _i++) {
    var _c = text.charCodeAt(_i);
    if (_c >= 0xD800 && _c <= 0xDBFF && _i + 1 < n) {
      _c = (_c << 10) + text.charCodeAt(++_i) - 0x35FDC00;
    }
    if (_c < 0x80) {
      bytes[offset++] = _c;
    } else {
      if (_c < 0x800) {
        bytes[offset++] = _c >> 6 & 0x1F | 0xC0;
      } else {
        if (_c < 0x10000) {
          bytes[offset++] = _c >> 12 & 0x0F | 0xE0;
        } else {
          bytes[offset++] = _c >> 18 & 0x07 | 0xF0;
          bytes[offset++] = _c >> 12 & 0x3F | 0x80;
        }
        bytes[offset++] = _c >> 6 & 0x3F | 0x80;
      }
      bytes[offset++] = _c & 0x3F | 0x80;
    }
  }
}
function writeByteBuffer(bb, buffer) {
  var offset = grow(bb, buffer.limit);
  var from = bb.bytes;
  var to = buffer.bytes;
  for (var i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}
function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}
function writeByte(bb, value) {
  var offset = grow(bb, 1);
  bb.bytes[offset] = value;
}
function readVarint32(bb) {
  var c = 0;
  var value = 0;
  var b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}
function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, value & 0x7f | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}
function writeVarint64(bb, value) {
  var part0 = value.low >>> 0;
  var part1 = (value.low >>> 28 | value.high << 4) >>> 0;
  var part2 = value.high >>> 24;
  var size = part2 === 0 ? part1 === 0 ? part0 < 1 << 14 ? part0 < 1 << 7 ? 1 : 2 : part0 < 1 << 21 ? 3 : 4 : part1 < 1 << 14 ? part1 < 1 << 7 ? 5 : 6 : part1 < 1 << 21 ? 7 : 8 : part2 < 1 << 7 ? 9 : 10;
  var offset = grow(bb, size);
  var bytes = bb.bytes;
  switch (size) {
    case 10:
      bytes[offset + 9] = part2 >>> 7 & 0x01;
    case 9:
      bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8:
      bytes[offset + 7] = size !== 8 ? part1 >>> 21 | 0x80 : part1 >>> 21 & 0x7F;
    case 7:
      bytes[offset + 6] = size !== 7 ? part1 >>> 14 | 0x80 : part1 >>> 14 & 0x7F;
    case 6:
      bytes[offset + 5] = size !== 6 ? part1 >>> 7 | 0x80 : part1 >>> 7 & 0x7F;
    case 5:
      bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4:
      bytes[offset + 3] = size !== 4 ? part0 >>> 21 | 0x80 : part0 >>> 21 & 0x7F;
    case 3:
      bytes[offset + 2] = size !== 3 ? part0 >>> 14 | 0x80 : part0 >>> 14 & 0x7F;
    case 2:
      bytes[offset + 1] = size !== 2 ? part0 >>> 7 | 0x80 : part0 >>> 7 & 0x7F;
    case 1:
      bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

export { EventDispatcher, Networking, NetworkingEvents, UseViewModel, View, ViewModel, bind, bindable, decodeMembership, decodePerson, decodePersons, encodeMembership, encodePerson, encodePersons };
