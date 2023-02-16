<template>
  <div class="birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel = 'cancel'
      @confirm = 'submit'
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data(){
    return {
      minDate: new Date(1988, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate:'',
    }
  },
  props:{
    index:{
      type:String,
      require
    }
  },
  created(){
    console.log(this.index,'白们');
    const arr = this.index.split('-')
    this.currentDate =new Date(...arr);
    console.log(this.currentDate,'dddd')
  },
  methods:{
    cancel(){
            this.$emit('show',false);
    },
    submit(){
      const time = dayjs(this.currentDate).format('YYYY-MM-DD');
      this.$emit('show',false);
      this.$emit('message',time)
      console.log(dayjs(this.currentDate).format('YYYY-MM-DD'),'时间');
      this.$toast.success('修改成功')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
