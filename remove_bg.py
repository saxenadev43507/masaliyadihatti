import os
from rembg import remove
from PIL import Image

input_dir = r"C:\Users\lenovo\Downloads\masaliyadihatti\client\public\Banner images"
output_dir = r"C:\Users\lenovo\Downloads\masaliyadihatti\client\public\brands"

os.makedirs(output_dir, exist_ok=True)

files = {
    "noorii.png":           "noori.png",
    "Nawaab's secret.jpeg": "nawaabs.png",
    "Shan e delhi.jpg":     "shanedelhi.png",
    "starmasale.jpg":       "star.png",
    "roopakk.jpg":          "roopak.png",
}

for src_name, dst_name in files.items():
    src_path = os.path.join(input_dir, src_name)
    dst_path = os.path.join(output_dir, dst_name)
    print(f"Processing: {src_name} -> {dst_name}")
    with open(src_path, "rb") as f:
        input_data = f.read()
    output_data = remove(input_data)
    with open(dst_path, "wb") as f:
        f.write(output_data)
    print(f"  Saved: {dst_path}")

print("\nAll done!")
