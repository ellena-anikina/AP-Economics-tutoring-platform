import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleLayout, {
  articleMetadata,
  ArticleSection,
  LINK,
  P,
  ParentsCanDo,
  PROSE,
} from '@/components/ArticleLayout';
import BookButton from '@/components/BookButton';
import Reg from '@/components/Reg';
import { getArticle } from '@/config/articles';
import { whatsappGeneral } from '@/lib/contact-links';

/**
 * Статья «Does My Child Need an AP® Economics Tutor?» — первая, рассчитанная
 * именно на американских родителей.
 *
 * ТЕКСТ ОЛЬГИ, ПРИСЛАН 03.11, ПРАВИТСЯ ТОЛЬКО С НЕЙ (принцип 2). От присланного
 * он отличается в двух местах:
 * — у AP везде стоит ® (принцип 4);
 * — консультация названа 15-минутной, у Ольги было 20 (см. комментарий на месте).
 *
 * Ссылки внутри текста поставлены на её же слова, новых фраз в него не
 * добавлено. Блок Related в конце — навигация сайта, а не её текст.
 *
 * Формулировка про College Board в разделе 4 сверена 03.11 со страницами
 * экзаменов Micro и Macro: «Explain…», «Perform numerical analysis and
 * calculations», «Create graphs or visual representations».
 */

const article = getArticle('does-my-child-need-ap-economics-tutor');

export const metadata: Metadata = articleMetadata(article);

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function DoesMyChildNeedTutor() {
  return (
    <ArticleLayout article={article}>
      <div className="flex flex-col gap-4">
        <P>
          Your teenager studies for hours, completes assignments, and tells you everything is going
          fine. Then another AP® Economics quiz comes back with a disappointing grade.
        </P>
        <P>
          As a parent, you may wonder: Is AP® Economics simply too difficult? Is my child not
          studying enough? Or is there something missing in the way they are learning?
        </P>
        <P>The answer may surprise you.</P>
        <P>
          AP® Economics is not primarily about memorizing definitions. It requires students to
          analyze situations, interpret graphs, apply economic models, and explain relationships
          between economic variables.
        </P>
        <P>
          As an AP® Economics teacher, I’ve seen how students can understand individual concepts yet
          struggle when asked to apply them to unfamiliar questions.
        </P>
        <P>Here are seven signs that your teenager may benefit from additional support.</P>
      </div>

      <ArticleSection title="1. Your Child Studies Hard but Their Grades Aren’t Improving">
        <P>
          One of the most frustrating situations for students is putting in genuine effort without
          seeing results.
        </P>
        <P>
          They review their notes, watch videos, memorize definitions, and still struggle with
          assessments.
        </P>
        <P>Why does this happen?</P>
        <P>
          AP® Economics examinations test more than factual knowledge. Students must use economic
          reasoning to solve problems.
        </P>
        <P>
          For example, knowing the definition of demand is not the same as explaining how a change
          in consumer income affects equilibrium price and quantity.
        </P>
        <ParentsCanDo first="Ask your teenager to explain an economic concept in their own words and apply it to a simple real-world example.">
          <P>
            If they can repeat the definition but cannot explain the application, they may need a
            different approach to studying.
          </P>
        </ParentsCanDo>
      </ArticleSection>

      <ArticleSection title="2. Economic Graphs Are Becoming a Major Obstacle">
        <P>Graphs are a fundamental part of both AP® Microeconomics and AP® Macroeconomics.</P>
        <P>
          Students work with supply and demand, production possibilities curves, cost curves,
          aggregate demand and aggregate supply, and other economic models.
        </P>
        <P>
          A student may understand a concept verbally but struggle to represent it correctly on a
          graph.
        </P>
        <P>Common difficulties include:</P>
        <ul className={`flex list-disc flex-col gap-2 pl-5 ${PROSE}`}>
          <li>Confusing a movement along a curve with a shift of the curve.</li>
          <li>Labeling axes incorrectly.</li>
          <li>Shifting a curve in the wrong direction.</li>
          <li>Identifying the initial equilibrium but not the new equilibrium.</li>
        </ul>
        <ParentsCanDo first="Ask your teenager to draw a basic supply-and-demand graph and explain what happens when consumer demand increases.">
          <P>
            The goal is not simply to produce a graph. They should be able to explain the economic
            reasoning behind each change.
          </P>
        </ParentsCanDo>
      </ArticleSection>

      <ArticleSection title="3. Multiple-Choice Questions Feel Confusing">
        <P>You may hear your child say:</P>
        <blockquote className="border-l-2 border-rule-strong pl-4 font-serif text-[1.125rem] leading-snug text-ink">
          “I knew the material, but two answers looked correct.”
        </blockquote>
        <P>This is a common challenge in AP® Economics.</P>
        <P>
          Multiple-choice questions often require students to distinguish between closely related
          concepts.
        </P>
        <P>Consider the difference between an increase in demand and an increase in quantity demanded.</P>
        <P>These terms sound similar, but they describe different economic situations.</P>
        <P>
          Students who rely mainly on memorization may struggle to identify which concept a question
          is actually testing.
        </P>
        <ParentsCanDo first="Encourage your child to explain why the correct answer is correct and why the other choices are incorrect.">
          <P>
            This helps reveal whether they understand the concept or are simply recognizing familiar
            vocabulary.
          </P>
        </ParentsCanDo>
      </ArticleSection>

      <ArticleSection title="4. Free-Response Questions Are Particularly Difficult">
        <P>
          Both AP® Microeconomics and AP® Macroeconomics include free-response questions (FRQs).
        </P>
        <P>
          According to the College Board, these questions assess students’ ability to explain
          economic relationships, perform calculations, and use correctly constructed economic
          models.
        </P>
        <P>
          A student might understand the material but lose points because their explanation is
          incomplete, their graph lacks an essential label, or their answer does not address what
          the question asks.
        </P>
        <ParentsCanDo first="Review a recent free-response assignment with your child.">
          <P>
            Look for patterns. Are the errors mainly conceptual? Graphical? Mathematical? Or related
            to interpreting the question?
          </P>
          <P>
            Identifying the type of mistake is often more useful than simply completing additional
            practice questions.
          </P>
        </ParentsCanDo>
      </ArticleSection>

      <ArticleSection title="5. Your Child Understands Each Topic Separately but Cannot Connect Them">
        <P>Economics is an interconnected subject.</P>
        <P>
          In AP® Macroeconomics, for example, interest rates influence investment spending, which
          affects aggregate demand and potentially real output and the price level.
        </P>
        <P>Understanding each individual term is only the beginning.</P>
        <P>
          Students must be able to follow a sequence of economic events and explain the relationship
          between them.
        </P>
        <P>
          If your teenager knows the definitions but struggles with questions asking “What happens
          next?”, they may need more practice with economic reasoning.
        </P>
        <ParentsCanDo first="Encourage your child to explain economic changes as a chain of cause and effect.">
          <P>
            Rather than asking, “What is monetary policy?” ask, “What could happen to investment
            spending if interest rates increase, and why?”
          </P>
        </ParentsCanDo>
      </ArticleSection>

      <ArticleSection title="6. Your Teenager Is Losing Confidence in Economics">
        <P>Sometimes the first warning sign is not a grade.</P>
        <P>It is a change in attitude.</P>
        <P>
          A student who was previously interested in economics may begin avoiding assignments,
          postponing revision, or repeatedly saying, “I’m just not good at this subject.”
        </P>
        <P>This does not necessarily indicate a lack of ability or effort.</P>
        <P>
          Sometimes students have accumulated small gaps in understanding. As new topics build on
          previous material, those gaps become increasingly difficult to manage.
        </P>
        <ParentsCanDo first="Approach the situation with curiosity rather than pressure.">
          <P>Ask which specific topics feel confusing and whether your child knows how to get help.</P>
          <P>A supportive conversation can make it easier to identify what is really happening.</P>
        </ParentsCanDo>
      </ArticleSection>

      <ArticleSection title="7. Your Child Is Waiting Until the AP® Exam to Start Preparing">
        <P>
          One of the biggest mistakes students can make is treating AP® Economics preparation as
          something that begins a few weeks before the examination.
        </P>
        <P>Effective exam preparation should build throughout the course.</P>
        <P>
          Students need opportunities to review earlier material, develop graphing accuracy, practice
          economic reasoning, and become comfortable with multiple-choice and free-response formats.
        </P>
        <P>Rushing through all these skills immediately before the exam can be overwhelming.</P>
        <ParentsCanDo first="Help your teenager create a manageable preparation schedule that includes regular practice and review, rather than relying only on last-minute studying." />
      </ArticleSection>

      <ArticleSection title="What Should Parents Do If Their Child Is Struggling with AP® Economics?">
        <P>Before arranging additional tutoring, try to identify the exact problem.</P>
        <P>
          Start by looking at recent assessments. Is your child consistently struggling with economic
          graphs? Do they understand the concepts but lose points on free-response explanations? Are
          they finding it difficult to apply ideas to new situations?
        </P>
        <P>Then speak with their classroom teacher about areas that need attention.</P>
        <P>In some cases, a few changes to study habits and targeted practice may be enough.</P>
        <P>
          In others, individualized instruction can help students work through misunderstandings,
          strengthen their economic reasoning, and build a more structured approach to exam
          preparation.
        </P>
        <P>
          The important thing is to focus on the student’s actual learning needs rather than simply
          increasing the number of hours they study.
        </P>
      </ArticleSection>

      <ArticleSection title="How Individual AP® Economics Tutoring Can Help">
        <P>Effective tutoring should go beyond repeating material from the textbook.</P>
        <P>
          It should help students understand why economic models work, recognize patterns in exam
          questions, explain cause-and-effect relationships, and apply their knowledge independently.
        </P>
        <P>Every student has different strengths and challenges.</P>
        <P>
          Some need additional support with AP® Microeconomics graphs and market structures. Others
          struggle with AP® Macroeconomics topics such as monetary policy, aggregate demand, or
          international trade.
        </P>
        <P>A personalized approach makes it possible to focus on the skills that need the most attention.</P>
      </ArticleSection>

      <ArticleSection title="Looking for AP® Economics Support?">
        <p className={PROSE}>
          I’m{' '}
          <Link href="/about-olga-shalamai" className={LINK}>
            Olga Shalamai
          </Link>
          , <Reg>an experienced AP® Microeconomics and AP® Macroeconomics teacher and the founder of Olganomics.</Reg>
        </p>
        <p className={PROSE}>
          Through Olganomics, I provide{' '}
          <Link href="/ap-economics-tutor" className={LINK}>
            personalized online economics instruction
          </Link>{' '}
          <Reg>
            to help students strengthen their understanding, develop economic reasoning, and prepare
            more confidently for AP® assessments.
          </Reg>
        </p>
        <P>
          If your teenager is struggling with AP® Economics, you don’t have to guess what kind of
          help they need.
        </P>
        {/* У Ольги здесь «free 20-minute consultation», на всём остальном сайте —
            15 минут, включая её одобренные тексты и сообщение, которое кнопка
            ниже подставляет в WhatsApp. Пока она не подтвердила 20, стоит 15:
            страница не должна спорить сама с собой (TODO.md, раздел 5). */}
        <P>
          I offer a free 15-minute consultation to discuss your child’s current challenges, academic
          goals, and possible next steps.
        </P>
        <div className="pt-1">
          <BookButton
            href={whatsappGeneral()}
            size="lg"
            full
            label="Contact me on WhatsApp to arrange a consultation"
          />
        </div>
        <p className="pt-2 font-serif text-[1.125rem] font-semibold leading-snug text-ink">
          Olganomics — Economics Made Clear.
        </p>
        <p className="text-pretty text-[15px] leading-relaxed text-ink-soft">
          <Reg>Official AP® exam information:</Reg>{' '}
          <a
            href="https://apstudents.collegeboard.org/courses/ap-microeconomics/assessment"
            {...EXTERNAL}
            className={LINK}
          >
            <Reg>College Board AP® Microeconomics</Reg>
          </a>{' '}
          and{' '}
          <a
            href="https://apstudents.collegeboard.org/courses/ap-macroeconomics/assessment"
            {...EXTERNAL}
            className={LINK}
          >
            <Reg>College Board AP® Macroeconomics</Reg>
          </a>
          .
        </p>
      </ArticleSection>

      {/* Навигация, а не текст Ольги: следующий шаг для того, кто дочитал, но
          писать пока не готов. Заодно внутренние ссылки для робота. Ссылки
          текстом: кнопка на странице одна (принцип 1). */}
      <nav aria-label="Related pages" className="flex flex-col gap-3 border-t border-rule pt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-soft">Related</p>
        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-ink-soft">
          <li>
            <Link href="/ap-economics-tutor" className={LINK}>
              <Reg>AP® Economics tutor: how my lessons work</Reg>
            </Link>
          </li>
          <li>
            <Link href="/practice-test/ap-microeconomics" className={LINK}>
              <Reg>Free AP® Microeconomics unit tests</Reg>
            </Link>
          </li>
          <li>
            <Link href="/faq#choose-good-ap-economics-tutor" className={LINK}>
              <Reg>How do I choose a good AP® Economics tutor?</Reg>
            </Link>
          </li>
        </ul>
      </nav>
    </ArticleLayout>
  );
}
