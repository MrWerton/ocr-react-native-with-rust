#[repr(C)]
pub struct ImageSize {
    pub width: u32,
    pub height: u32,
}

#[no_mangle]
pub extern "C" fn rust_image_size(image_data_ptr: *const u8) -> ImageSize {
    let width = unsafe { *(image_data_ptr as *const u32) };
    let height = unsafe { *((image_data_ptr.offset(4)) as *const u32) };

    ImageSize { width, height }
}

/// cbindgen:ignore
#[cfg(target_os = "android")]
pub mod android {
    use crate::rust_image_size;
    use crate::ImageSize;
    use jni::JNIEnv;
    use jni::objects::JClass;
    
    
    #[no_mangle]
    pub unsafe extern "C" fn Java_expo_modules_ocrlib_OcrLibModule_rust_image_size(
        _env: JNIEnv,
        _class: JClass,
        image_data_ptr: *const u8
    ) -> ImageSize {
        rust_image_size(image_data_ptr)
    }
}