import { Component } from 'solid-js'
import DataReadingIcon from '../icons/DataReadingIcon'
import DeleteIcon from '../icons/DeleteIcon'
import SortingIcon from '../icons/SortingIcon'
import SearchIcon from '../icons/SearchIcon'

const AppInfo: Component = () => {
  return (
    <section class="w-full">
      <div class="container py-8 px-4 md:px-6">
        <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <DataReadingIcon />
              <h3 class="ml-2 text-2xl font-bold">Data Reading</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              Easily manage your CSV files with our intuitive application.
              Upload your files and unlock powerful features to streamline your
              data management process.
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <SortingIcon />
              <h3 class="ml-2 text-2xl font-bold">Sorting</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              Arrange your data alphabetically or numerically based on a chosen
              identifier.
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <DeleteIcon />
              <h3 class="ml-2 text-2xl font-bold">Delete Duplicates</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              Eliminate redundant data entries to keep your datasets clean and
              efficient.
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <SearchIcon />
              <h3 class="ml-2 text-2xl font-bold">Searching</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              Quickly locate specific records by searching for values within
              your CSV files.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppInfo
