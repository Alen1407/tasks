from Cube import Cube
import random

class Encryption:

    def __init__(self, FILEPATH):
        # reading from the file
        with open(FILEPATH, 'r') as file:
            lines = file.readlines()

            key_line = lines[0].strip()
            key = key_line.split(':', 1)[1].strip()

            text_lines = lines[2:]
            text = ''.join(text_lines).strip()


        self.key = key
        remainder = len(text) % 8
        padding = 8 - remainder if remainder != 0 else 0
        text += '#' * padding

        self.split_text = [text[i:i + 8] for i in range(0, len(text), 8)]
        self.cubes = [Cube(i) for i in self.split_text]

    def encrypt(self):

        self.encrypted_text = ""

        self.key_ls = self.key.split(":")
        for (i, key) in enumerate(self.key_ls):
            instructions = key.split(',')

            for instruction in instructions:
                direction = instruction[0]
                steps = int(instruction[1:])

                if direction == 'U':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_up()
                elif direction == 'D':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_down()
                elif direction == 'L':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_left()
                elif direction == 'R':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_right()

        for cube in self.cubes:
            self.encrypted_text += cube.get_text()

        with open("../encrypted", 'w') as file:
            file.write(f"key: {self.key}\n")
            file.write("\n")
            file.write(self.encrypted_text)

        return self.encrypted_text










    def generate_key(self):
        key = ":".join(self.key_ls)

        return key

    def print_text(self):
        self.text = ""
        for cube in self.cubes:
            self.text += str(cube.get_text())

        print(self.text)

