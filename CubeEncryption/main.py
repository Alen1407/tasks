from Encryption import Encryption
from Decryption import Decryption


enc = Encryption("../file")
dec = Decryption("../encrypted")
print(dec.decrypt())
