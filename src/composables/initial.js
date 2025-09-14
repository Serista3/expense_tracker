import { ref } from 'vue';

export const exData = ref(
    [
            {
                "id": '1',
                "title": "Grocery Shopping",
                "description": ".............",
                "type": "expense",
                "category": "Food",
                "amount": -50.75,
                "date": "2024-06-01"
            },
            {
                "id": '2',
                "title": "Transport",
                "description": ".............",
                "type": "income",
                "category": "Transport",
                "amount": 1500.00,
                "date": "2024-06-05"
            },
    ]
)

export const exCategory = ref([
  {
    "id": "1",
    "name": "Food",
    "color": "#ffa135",
  },
  {
    "id": "2",
    "name": "Transport",
    "color": "#35C9FF",
  }
])