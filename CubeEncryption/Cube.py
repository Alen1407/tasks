class Cube:
    def __init__(self, text):
        self.side1 = text[0]
        self.side2 = text[1]
        self.side3 = text[2]
        self.side4 = text[3]
        self.side5 = text[4]
        self.side6 = text[5]
        self.side7 = text[6]
        self.side8 = text[7]


    def get_text(self):
        return self.side1 + self.side2 + self.side3 + self.side4 + self.side5 + self.side6 + self.side7 + self.side8
    def rotate_left(self):
        self.side1, self.side2, self.side3, self.side4, self.side5, self.side6, self.side7, self.side8 = self.side2, self.side6, self.side7, self.side3, self.side1, self.side5, self.side8, self.side4

    def rotate_right(self):
        self.side1, self.side2, self.side3, self.side4, self.side5, self.side6, self.side7, self.side8 = self.side5, self.side1, self.side4, self.side8, self.side6, self.side2, self.side3, self.side7

    def rotate_up(self):
        self.side1, self.side2, self.side3, self.side4, self.side5, self.side6, self.side7, self.side8 = self.side4, self.side3, self.side7, self.side8, self.side1, self.side2, self.side6, self.side5

    def rotate_down(self):
        self.side1, self.side2, self.side3, self.side4, self.side5, self.side6, self.side7, self.side8 = self.side5, self.side6, self.side2, self.side1, self.side8, self.side7, self.side3, self.side4