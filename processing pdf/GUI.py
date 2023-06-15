import tkinter as tk
from tkinter import filedialog
from Logic import process_pdf


def process_file():
    file_path = file_entry.get()

    # Performing file processing
    result = process_pdf(file_path)

    result_text.delete("1.0", tk.END)
    result_text.insert(tk.END, result)


def browse_file():
    file_path = filedialog.askopenfilename(filetypes=[("PDF files", "*.pdf")])
    file_entry.delete(0, tk.END)
    file_entry.insert(tk.END, file_path)


# Create the main window
window = tk.Tk()
window.title("File Processing App")

# Create the file entry field
file_entry = tk.Entry(window, width=50)
file_entry.pack()

# Create the Browse button
browse_button = tk.Button(window, text="Browse", command=browse_file)
browse_button.pack()

# Create the Process button
process_button = tk.Button(window, text="Process", command=process_file)
process_button.pack()

# Create the result text area
result_text = tk.Text(window, height=10, width=50)
result_text.pack()


def implement_logic():
    # Start the main event loop
    window.mainloop()
