from Cube import Cube
from Encryption import Encryption
from Decryption import Decryption

text = "students"

cube = Cube(text)

cube.rotate_left()
cube.rotate_right()
cube.rotate_up()
cube.rotate_down()

enc = Encryption("../file")
dec = Decryption(enc.encrypt(), "U3:R3:D3")
print(dec.decrypt())
