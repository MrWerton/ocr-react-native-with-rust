#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct ImageSize {
  uint32_t width;
  uint32_t height;
} ImageSize;

struct ImageSize rust_image_size(const uint8_t *image_data_ptr);
