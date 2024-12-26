import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load Dataset
train_datagen = ImageDataGenerator(rescale=1./255)
train_data = train_datagen.flow_from_directory('dataset/train', target_size=(128, 128), batch_size=32, class_mode='categorical')

# Build Model
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(5, activation='softmax')  # 5 categories: AC damage, Fridge issue, etc.
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_data, epochs=10)

# Save the Model
model.save('appliance_issue_detector.h5')
