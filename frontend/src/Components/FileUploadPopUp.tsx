import { Accessor, Component, Setter, Show } from 'solid-js'

interface PropsType {
  setShowForm: Setter<boolean>
  fileMutateOptions: Accessor<{
    action: number
    valueType: number
    index: number
  }>
  setFileMutateOptions: Setter<{
    action: number
    valueType: number
    index: number
  }>
  handleFormSubmit(): void
}

const FileUploadPopUp: Component<PropsType> = props => {
  function handleModalClose() {
    props.setFileMutateOptions({
      action: 1,
      valueType: 1,
      index: 1,
    })
    props.setShowForm(false)
  }

  return (
    <div class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-700 opacity-50"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div class="inline-block align-bottom bg-[#242424] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-[#242424] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-2xl leading-6 font-semibold text-gray-100"
                id="modal-title"
              >
                More Information Needed
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-300">
                  Note: It is expected that fields are seperated by commas ' , '
                  and new information is on a newline. See example files for
                  clarification
                </p>
              </div>
              <form action="" class="mt-2 flex flex-col">
                <label for="action-select">What would you like to do</label>
                <select
                  class="bg-white text-black rounded-lg md:w-1/3 p-1"
                  name="action-select"
                  id="action-select"
                  onChange={e =>
                    props.setFileMutateOptions(prev => ({
                      ...prev,
                      action: parseInt(e.target.value),
                    }))
                  }
                >
                  <option value="1">Sort</option>
                  <option value="2">Search</option>
                  <option value="3">Delete Duplicates</option>
                </select>
                <Show when={props.fileMutateOptions().action != 3}>
                  <label for="action-select" class="mt-2">
                    Is this a numerical or Character value
                  </label>
                  <select
                    class="bg-white p-1 text-black rounded-lg md:w-1/3"
                    name="action-select"
                    id="action-select"
                    onChange={e =>
                      props.setFileMutateOptions(prev => ({
                        ...prev,
                        valueType: parseInt(e.target.value),
                      }))
                    }
                  >
                    <option value="1">Number</option>
                    <option value="2">Character</option>
                  </select>
                  <label for="action-select" class="mt-2">
                    What position is this value
                  </label>
                  <p class="text-sm mb-1">
                    Ex. id,birthday,name (id = 1, name = 3)
                  </p>
                  <input
                    type="number"
                    class="bg-white w-1/2 p-1 rounded-lg text-black md:w-1/3"
                    onChange={e =>
                      props.setFileMutateOptions(prev => ({
                        ...prev,
                        index: parseInt(e.target.value),
                      }))
                    }
                  />
                </Show>
              </form>
            </div>
          </div>
          <div class="bg-[#242424] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              class="bg-green-600 ml-2 p-2 rounded-md"
              onClick={props.handleFormSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onclick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadPopUp
