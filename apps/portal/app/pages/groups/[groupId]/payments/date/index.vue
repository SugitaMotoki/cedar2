<script setup lang="ts">
import {
  type DateValue,
  CalendarDate,
  JapaneseCalendar,
  now,
  getLocalTimeZone,
} from "@internationalized/date";

const route = useRoute();

/**
 * カレンダー
 */
const { year, month, day } = now(getLocalTimeZone());
const modelValue = shallowRef(
  new CalendarDate(new JapaneseCalendar(), year, month, day),
);

/**
 * カレンダーの日付をクリックした際の、日付に応じた遷移先を取得する関数
 * @param date NuxtLink用の遷移先オブジェクト
 */
const getDateLinkObject = (
  date: DateValue,
): {
  name: string;
  params: {
    groupId: string;
    yyyy: string;
    mm: string;
    dd: string;
  };
} => {
  return {
    name: "groups-groupId-payments-date-yyyy-mm-dd",
    params: {
      groupId: route.params["groupId"] as string,
      yyyy: String(date.year),
      mm: String(date.month).padStart(2, "0"),
      dd: String(date.day).padStart(2, "0"),
    },
  };
};
</script>

<template>
  <UPage>
    <UPageHeader title="カレンダー" headline="支払い" />

    <UPageBody>
      <UCalendar v-model="modelValue">
        <template #day="{ day: date }">
          <ULink :to="getDateLinkObject(date)" inactive-class="text-default">
            {{ date.day }}
          </ULink>
        </template>
      </UCalendar>
    </UPageBody>
  </UPage>
</template>
