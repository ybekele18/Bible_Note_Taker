# bible_note_taker.py

def show_notes(notes):
    if not notes:
        print("No notes yet.")
    for verse, note in notes.items():
        print(f"{verse}: {note}")

def main():
    notes = {}
    while True:
        print("\n--- Bible Note Taker ---")
        print("1. Add Note")
        print("2. View Notes")
        print("3. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            verse = input("Enter Bible verse (e.g., John 3:16): ")
            note = input("Enter your note: ")
            notes[verse] = note
            print("Note saved!")
        elif choice == "2":
            show_notes(notes)
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid option. Try again.")

if __name__ == "__main__":
    main()
