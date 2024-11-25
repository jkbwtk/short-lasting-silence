import Widget from '#components/Widget';
import style from '#styles/WidgetTest.module.scss';

const WidgetTest: Component = () => {
  return (
    <Widget title="Test" class={style.widget}>
      <span>test</span>
    </Widget>
  );
};

export default WidgetTest;
