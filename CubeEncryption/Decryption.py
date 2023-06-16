from Cube import Cube

class Decryption:
    def __init__(self, text, key):
        self.key_ls = key.split(":")
        self.split_text = [text[i:i + 8] for i in range(0, len(text), 8)]
        self.cubes = [Cube(i) for i in self.split_text]

    def decrypt(self):
        self.decrypted_text = ""

        for (i, key) in enumerate(self.key_ls):
            instructions = key.split(',')

            for instruction in instructions:
                direction = instruction[0]
                steps = int(instruction[1:])

                if direction == 'U':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_down()
                elif direction == 'D':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_up()
                elif direction == 'L':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_right()
                elif direction == 'R':
                    for _ in range(int(steps)):
                        self.cubes[i].rotate_left()

        for cube in self.cubes:
            self.decrypted_text += cube.get_text()

        return self.decrypted_text