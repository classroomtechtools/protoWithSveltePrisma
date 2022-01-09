export let program: string;
export let subject: string;
export let teacher: string;
export let grade: number;

export const selections = [
    {
      "id": "Programs",
      "items": [
        {value: 'diploma', label: 'IB Diploma', group: 'programs'},
        {value: 'myp', label: 'IB MYP', group: 'programs'}
      ],
      "handleSelect": (event) => {
        program = event.detail.value
      },
      "handleClear": () => {
        program = undefined
      }
    }, {
      "id": "Subjects",
      "items": [
        {value: 'Computer Science', label: 'Computer Science', group: 'subjects'},
        {value: 'Theatre', label: 'Theatre', group: 'subjects'},
      ]
    }, {
      "id": "Teachers",
      "items": [
        {value: 'Adam', label: 'Adam', group: 'teachers'},
        {value: 'Yuri', label: 'Adam', group: 'teachers'},
        {value: 'Jamie', label: 'Jamie', group: 'teachers'},
      ]
    }, {
      "id": "Grades",
      "items": [
        {value: '1', label: 'Grade 1', group: 'grades'},
        {value: '2', label: 'Grade 2', group: 'grades'},
        {value: '9', label: 'Grade 9', group: 'grades'},
        {value: '10', label: 'Grade 10', group: 'grades'},
        {value: '11', label: 'Grade 11', group: 'grades'},
        {value: '12', label: 'Grade 12', group: 'grades'},
      ]
    }
  ]