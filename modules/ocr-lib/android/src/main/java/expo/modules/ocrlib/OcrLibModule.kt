package expo.modules.ocrlib

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class OcrLibModule : Module() {
     companion object {
        init {
            System.loadLibrary("ocr_rust_lib") // Load the native Rust library
        }
    }
    external fun rustImageSize(imageData: ByteArray): Map<String, Int>

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('OcrLib')` in JavaScript.
    Name("OcrLib")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }
   AsyncFunction("rustImageSize") { imageData: ByteArray ->
    // Convert the ByteArray to a pointer for Rust interop
    val imageSize = rustImageSize(imageData)

    // Return image size as a map to JavaScript
    mapOf(
        "width" to (imageSize["width"] ?: 0),
        "height" to (imageSize["height"] ?: 0)
    )
}

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(OcrLibView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: OcrLibView, prop: String ->
        println(prop)
      }
    }
  }
}
