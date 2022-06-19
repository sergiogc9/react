// src/components/components.ts
import React from "react";
var createNameSpacedComponent = (mainComponent, composedComponents) => {
  const composedComponent = { ...mainComponent };
  Object.keys(composedComponents).forEach((key) => {
    composedComponent[key] = composedComponents[key];
  });
  return composedComponent;
};
var lazyLoadComponent = (importStatement) => {
  const LazyComponent = React.lazy(importStatement);
  setTimeout(() => importStatement(), 1e3);
  return LazyComponent;
};

// src/image/image.ts
var cropImage = (image, cropArea) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const JSImage = new Image();
    JSImage.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      ctx.drawImage(JSImage, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    JSImage.src = image;
  });
};
var getImageFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};
var resizeImage = (image, maxSize = 1024) => {
  return new Promise((resolve) => {
    const JSImage = new Image();
    JSImage.onload = () => {
      const canvas = document.createElement("canvas");
      let { height, width } = JSImage;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(JSImage, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    JSImage.src = image;
  });
};
var convertImageToByteArray = (image) => {
  const binaryString = window.atob(image.replace("data:image/png;base64,", ""));
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return Array.from(new Uint8Array(bytes.buffer));
};

// src/keyboard/Keyboard.ts
var KEYS = {
  ArrowDown: { code: 40, value: "ArrowDown" },
  ArrowUp: { code: 38, value: "ArrowUp" },
  Backspace: { code: 8, value: "Backspace" },
  End: { code: 8, value: "End" },
  Enter: { code: 13, value: "Enter" },
  Escape: { code: 27, value: "Escape" },
  Home: { code: 36, value: "Home" },
  Space: { code: 32, value: " " },
  Tab: { code: 9, value: "Tab" }
};
var Keyboard = {
  isKey(key, eventValue) {
    const keyData = KEYS[key];
    if (!keyData)
      return false;
    if (typeof eventValue === "number")
      return eventValue === keyData.code;
    return eventValue === keyData.value;
  },
  isLetterOrNumber(keyValue) {
    const regex = /^[A-Za-z0-9]+$/;
    return keyValue.length === 1 && !!keyValue.match(regex);
  }
};
var Keyboard_default = Keyboard;

// src/redux/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
var getReducer = (reducer, meta) => ({
  reducer,
  prepare: (payload) => ({ payload, meta })
});
var getApiReducers = (reducers, options) => {
  const defaultReducer = (state) => state;
  return [
    getReducer(reducers.start || defaultReducer, {
      api: "start",
      showLoadingBar: options?.showLoadingBar
    }),
    getReducer(reducers.success || defaultReducer, {
      api: "success",
      showLoadingBar: options?.showLoadingBar
    }),
    getReducer(reducers.error || defaultReducer, {
      api: "error",
      reload: options?.reload,
      showLoadingBar: options?.showLoadingBar
    })
  ];
};
var getEntityFetchReducers = () => {
  return getApiReducers({
    start: (state) => {
      state.status = "loading";
    },
    success: (state) => {
      state.status = "loaded";
    },
    error: (state) => {
      state.status = "error";
    }
  });
};

// src/storage/storage.ts
import { EventEmitter } from "events";
import { DateTime } from "luxon";
var storageEventEmitter = new EventEmitter();
var __isItemValid = (key) => {
  const savedData = localStorage.getItem(key);
  if (!savedData)
    return false;
  const item = JSON.parse(savedData);
  const isValid = !item.expiresAt || DateTime.fromISO(item.expiresAt) > DateTime.now();
  if (!isValid)
    Storage.remove(key);
  return isValid;
};
var Storage = {
  has: (key) => __isItemValid(key),
  get: (key) => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const item = JSON.parse(savedData);
      if (__isItemValid(key))
        return item.value;
    }
    return null;
  },
  set: (key, value, expireDate) => {
    const item = {
      value
    };
    if (expireDate)
      item.expiresAt = DateTime.fromJSDate(expireDate).toISO();
    const stringValue = JSON.stringify(item);
    localStorage.setItem(key, stringValue);
    storageEventEmitter.emit(key);
  },
  remove: (key) => {
    localStorage.removeItem(key);
    storageEventEmitter.emit(key);
  },
  clear: () => localStorage.clear(),
  onKeyChange: (key, callback) => {
    return storageEventEmitter.addListener(key, callback);
  }
};
var storage_default = Storage;

// src/validation/validation.ts
import isEmpty from "lodash/isEmpty";
var isPhoneNumber = (phone) => {
  return !isEmpty(phone) && !!phone.match(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/));
};
export {
  Keyboard_default as Keyboard,
  storage_default as Storage,
  convertImageToByteArray,
  createNameSpacedComponent,
  createSlice,
  cropImage,
  getApiReducers,
  getEntityFetchReducers,
  getImageFromFile,
  getReducer,
  isPhoneNumber,
  lazyLoadComponent,
  resizeImage
};
//# sourceMappingURL=index.js.map
