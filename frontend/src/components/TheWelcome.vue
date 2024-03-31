<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Data Reading</template>
    Easily manage your CSV files with our intuitive application. Upload your
    files and unlock powerful features to streamline your data management
    process.
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Sorting</template>
    Arrange your data alphabetically or numerically based on a chosen
    identifier.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Deleting</template>
    Eliminate redundant data entries to keep your datasets clean and efficient.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Searching</template>
    Quickly locate specific records by searching for values within your CSV
    files.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Templated Files</template>
    Test our features beforehand with our selection of pre-made CSV files.
  </WelcomeItem>
</template>
