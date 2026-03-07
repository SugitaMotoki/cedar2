<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// 定数
const commonSchema = useZodSchema();
const { login } = useAuth();

// フォームのスキーマ
const formSchema = z.object({
  userId: commonSchema.userId,
  password: commonSchema.password,
});
type FormSchema = z.output<typeof formSchema>;

const isActiveAlert = ref(false);

/**
 * ボタン押下時の処理
 */
const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
  const result = await login({
    userId: event.data.userId,
    password: event.data.password,
  });
  if (result.isSuccessed) {
    navigateTo("/");
  } else {
    isActiveAlert.value = true;
  }
};
</script>

<template>
  <UPage>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard class="w-full max-w-md">
        <UAuthForm
          :schema="formSchema"
          title="ログイン"
          description="認証情報を入力してください。"
          icon="i-lucide-user"
          :fields="[
            {
              name: 'userId',
              type: 'text',
              label: 'ユーザID',
              placeholder: 'ユーザIDを入力',
              required: true,
            },
            {
              name: 'password',
              type: 'password',
              label: 'パスワード',
              placeholder: 'パスワードを入力',
              required: true,
            },
          ]"
          :submit="{
            label: 'ログイン',
          }"
          @submit="onSubmit"
        >
          <template #validation>
            <UAlert
              v-if="isActiveAlert"
              color="error"
              icon="i-lucide-info"
              title="ユーザIDまたはパスワードが違います。"
            />
          </template>
        </UAuthForm>
      </UPageCard>
    </div>
  </UPage>
</template>
