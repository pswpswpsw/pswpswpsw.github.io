import cv2
import sys
import os

def detect_face_center(image_path):
    # Load the cascade
    # We'll use the one included in cv2 data
    cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(cascade_path)

    # Read the input image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not read image at {image_path}")
        return

    # Convert into grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    if len(faces) == 0:
        print("No faces detected.")
        return

    # Assuming the largest face is the target if multiple are found
    # Find the largest face by area
    largest_face = max(faces, key=lambda r: r[2] * r[3])
    (x, y, w, h) = largest_face

    height, width, _ = img.shape
    
    center_x = x + w / 2
    center_y = y + h / 2
    
    pct_x = (center_x / width) * 100
    pct_y = (center_y / height) * 100
    
    print(f"Face detected at: x={x}, y={y}, w={w}, h={h}")
    print(f"Image dimensions: {width}x{height}")
    print(f"Center position percentages: X={pct_x:.2f}%, Y={pct_y:.2f}%")
    
    # Suggest CSS
    # If we want to zoom in, we might want to scale the image up in CSS (e.g. via height/width or transform)
    # But usually object-position is enough if the container crops it.
    # object-position: <x>% <y>%
    print(f"Suggested CSS: object-position: {pct_x:.2f}% {pct_y:.2f}%;")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python detect_face.py <image_path>")
    else:
        detect_face_center(sys.argv[1])
