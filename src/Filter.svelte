<script lang="ts">
    import Select from 'svelte-select';
    import {fade} from 'svelte/transition';

    type Class = {
        id: number;
        program: string;
        grade: number;
        subject: string;
    };
    
    async function getClasses({program, grade, subject, teacher}) {
      const url = new URL("http://localhost:5001/classes"),
            params = {
              program, grade, subject, teacher
            }
      for (const [key, value] of Object.entries(params)) {
        if (value == undefined) continue
        url.searchParams.append(key, value);
      }
      console.log(url);
      const res = await fetch(<any>url);
      const users = await res.json();
  
      if (res.ok) {
        return users;
      } else {
        throw new Error(users);
      }
    }

    const selections = [
      {
        "id": "Programs",
        "items": [
          {value: 'diploma', label: 'IB Diploma', group: 'programs', filter: null, selectable: true},
          {value: 'myp', label: 'IB MYP', group: 'programs', filter: null, selectable: true},
          {value: 'pyp', label: 'IB PYP', group: 'programs', filter: null, selectable: true},
          {value: 'hs', label: 'High School', group: 'programs', filter: null, selectable: true}
        ],
        "handleSelect": (event) => {
          program = event.detail.value
        },
        "handleClear": () => {
          program = undefined
        },
        "groupBy": null,
        "isMulti": false
      }, {
        "id": "Subjects",
        "items": [
          {value: 'Computer Science', label: 'Computer Science', group: 'Subjects', filter: 'diploma', program: 'IB Diploma', selectable: true},
          {value: 'Language acquisition', label: 'Language acquisition', group: 'Subjects', filter: 'myp', program: 'IB MYP', selectable: true},
          {value: 'Physical Education', label: 'Physical Education', group: 'Subjects', filter: 'myp', program: 'IB MYP', selectable: true},
          {value: 'Visual Arts', label: 'Arts', group: 'Subjects', filter: 'myp', program: 'IB MYP', selectable: true},
          {value: 'Study Hall', label: 'Study Hall', group: 'Subjects', filter: 'hs', program: 'High School', selectable: true},
          {value: 'Chinese', label: 'Chinese', group: 'Subjects', filter: 'pyp', program: 'IB PYP', selectable: true},
        ],
        "handleSelect": (event) => {
          subject = event.detail.value
        },
        "handleClear": () => {
          subject = undefined
        },
        "groupBy": (item) => item.program,
        "isMulti": true
      }, {
        "id": "Teachers",
        "items": [
          {value: 'Adam', label: 'Adam', group: 'teachers', filter: null, selectable: true},
          {value: 'Yuri', label: 'Adam', group: 'teachers', filter: null, selectable: true},
          {value: 'Jamie', label: 'Jamie', group: 'teachers', filter: null, selectable: true},
          {value: 'Ting', label: 'Ting', group: 'teachers', filter: null, selectable: true},
          {value: 'Jane', label: 'Jane  ', group: 'teachers', filter: null, selectable: true},
        ],
        "handleSelect": (event) => {
          teacher = event.detail.value
        },
        "handleClear": () => {
          teacher = undefined
        },
        "groupBy": null,
        "isMulti": false
      }, {
        "id": "Grades",
        "items": [
          {value: '1', label: 'Grade 1', group: 'grades', filter: null, selectable: true},
          {value: '2', label: 'Grade 2', group: 'grades', filter: null, selectable: true},
          {value: '9', label: 'Grade 9', group: 'grades', filter: null, selectable: true},
          {value: '10', label: 'Grade 10', group: 'grades', filter: null, selectable: true},
          {value: '11', label: 'Grade 11', group: 'grades', filter: null, selectable: true},
          {value: '12', label: 'Grade 12', group: 'grades', filter: null, selectable: true},
        ],
        "handleSelect": (event) => {
          grade = event.detail.value
        },
        "handleClear": () => {
          grade = undefined
        },
        "groupBy": null,
        "isMulti": false
      }
    ]

    let program: string;
    let subject: string;
    let teacher: string;
    let grade: number;

    const reset = () => {
      const items = selections.filter(s => s.id == "Subjects").pop().items
      items.forEach(item => item.selectable = true)

      program = undefined;
      subject = undefined;
      teacher = undefined;
      grade = undefined;
    }


    const optionIdentifier = 'label'
    const inputAttributes = {
      "class": "border border-amber-200"  
    }

    const adjustSubject = ({program}) => {
      if (program != undefined) {
        const items = selections.filter(s => s.id == "Subjects").pop().items
        items.forEach(item => item.selectable = item.filter === program)
      }
    }

    $: {
      adjustSubject({program});
    }

    $: allClassesPromise = getClasses({
                              program, grade, subject, teacher      
                            });


  </script>
  
  <section class="grid grid-cols-2 gap-10">
    <div class="border rounded border-slate-200 py-2">
      <div class="flex flex-row space-x-4 leading-6 mr-3">
        <div class="px-4 my-2 h-8 w-full font-bold text-2xl">Filter</div>
        <button on:click={reset} class="text-amber-600 justify-center bg-slate-500 mx-8 px-4 my-2 h-8 rounded-lg">Reset</button>
      </div>

      {#each selections as {id, items, groupBy, isMulti, handleSelect, handleClear}}
        <div class="mb-4">
          <div class="border-slate-200 px-3 py-4 bg-gray-50 flex flex-row space-x-4 leading-6 font-bold text-xl">
            {id}
          </div>
          <div class="px-3 py-1 flex flex-row">
              <Select {optionIdentifier} {inputAttributes} {groupBy} showIndicator={true} containerClasses="w-full" id={id} {items} on:select={handleSelect} on:clear={handleClear}/>
          </div>
        </div>
      {/each}
    </div>

    {#await allClassesPromise then classes}
    <div class="flex flex-col mb-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  </div>
  <div>
    {#if classes.length > 0}
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      {#each classes as klass}
        <tr in:fade>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{klass.name}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{klass.program}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{klass.subject}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{klass.grade}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{klass.teacher}</div>
          </td>
        </tr>
      {/each}
      </tbody>
    </table>
    {:else}
    <div role="alert">
      <div class="bg-sky-500 text-white font-bold text-lg rounded-t px-4 py-2">
        No Classes
      </div>
      <div class="border border-t-0 border-sky-400 rounded-b bg-sky-100 px-4 py-3 text-sky-700">
        The current selections do not match. Have you selected a valid Program / Subject / Grade combination?
      </div>
    </div>
    {/if}
    </div>
    </div>
    </div>
    </div>
    {/await}
  </section>