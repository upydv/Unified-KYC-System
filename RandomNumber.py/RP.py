import random

# Define a Node class for the binary search tree
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

# Define a BinarySearchTree class
class BinarySearchTree:
    def __init__(self):
        self.root = None

    # Insert a new key into the binary search tree
    def insert(self, key):
        if not self.root:
            self.root = Node(key)
        else:
            self._insert_recursive(self.root, key)

    # Recursive function to insert a new key
    def _insert_recursive(self, node, key):
        if key < node.key:
            if node.left is None:
                node.left = Node(key)
            else:
                self._insert_recursive(node.left, key)
        elif key > node.key:
            if node.right is None:
                node.right = Node(key)
            else:
                self._insert_recursive(node.right, key)

    # Search for a key in the binary search tree
    def search(self, key):
        return self._search_recursive(self.root, key)

    # Recursive function to search for a key
    def _search_recursive(self, node, key):
        if not node:
            return False
        elif node.key == key:
            return True
        elif key < node.key:
            return self._search_recursive(node.left, key)
        else:
            return self._search_recursive(node.right, key)

# Dictionary to store generated numbers for each state
generated_numbers = {}

def generate_random_number(state_name):
    global generated_numbers
    
    # Create a dictionary mapping state names to state initials
    state_initials = {
        'Andhra Pradesh': 'AP',
        'Arunachal Pradesh': 'AR',
        'Assam': 'AS',
        'Bihar': 'BR',
        'Chhattisgarh': 'CG',
        'Goa': 'GA',
        'Gujarat': 'GJ',
        'Haryana': 'HR',
        'Himachal Pradesh': 'HP',
        'Jammu and Kashmir': 'JK',
        'Jharkhand': 'JH',
        'Karnataka': 'KA',
        'Kerala': 'KL',
        'Madhya Pradesh': 'MP',
        'Maharashtra': 'MH',
        'Manipur': 'MN',
        'Meghalaya': 'ML',
        'Mizoram': 'MZ',
        'Nagaland': 'NL',
        'Odisha': 'OD',
        'Punjab': 'PB',
        'Rajasthan': 'RJ',
        'Sikkim': 'SK',
        'Tamil Nadu': 'TN',
        'Telangana': 'TS',
        'Tripura': 'TR',
        'Uttarakhand': 'UK',
        'Uttar Pradesh': 'UP',
        'West Bengal': 'WB',
        'Andaman and Nicobar Islands': 'AN',
        'Chandigarh': 'CH',
        'Dadra and Nagar Haveli and Daman and Diu': 'DN',
        'Delhi': 'DL',
        'Lakshadweep': 'LD',
        'Ladakh': 'LA',
        'Puducherry': 'PY'
    }
    
    # Get the state initials from the state name
    state_initial = state_initials.get(state_name, None)
    
    if state_initial:
        # Generate a random 6-digit number
        random_number = random.randint(100000, 999999)
        
        # Check if the number has already been generated for the state
        if state_initial in generated_numbers:
            if generated_numbers[state_initial].search(random_number):
                random_number = random.randint(100000, 999999)
        
        # Add the generated number to the binary search tree for the state
        if state_initial in generated_numbers:
            generated_numbers[state_initial].insert(random_number)
        else:
            bst = BinarySearchTree()
            bst.insert(random_number)
            generated_numbers[state_initial] = bst
        
        # Concatenate state initials and random number
        result = f"{state_initial}-{random_number}"
        return result, state_initial
    else:
        return None, None

# Ask user for state input
state_input = input("Enter the name of the state or union territory in India: ").strip().title()

# Generate random number based on user input
result, state_initial = generate_random_number(state_input)

if result:
    print(f"Generated random number with initials of {state_initial}: {result}")
else:
    print("Invalid state or union territory name entered.")
