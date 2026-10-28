import { BUDGETS, CONFIG, CONTACT_PREFS, projectTypes } from '../content';
import { MESSAGE_MAX, type useContactForm } from '../hooks/useContactForm';
import { reveal } from '../hooks/useReveal';
import { Icon, type IconName } from './Icon';
import './Contact.css';

type Form = ReturnType<typeof useContactForm>;
type Channel = { label: string; icon: IconName; href: string; display: string; external: boolean };

export function contactChannels(): Channel[] {
  const c = CONFIG.contacts;
  const digits = c.whatsapp.replace(/\D/g, '');
  const bare = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '');
  return [
    { label: 'WhatsApp', icon: 'message', href: digits ? 'https://wa.me/' + digits : '', display: digits ? '+' + digits : '', external: true },
    { label: 'E-mail', icon: 'mail', href: c.email ? 'mailto:' + c.email : '', display: c.email, external: false },
    { label: 'LinkedIn', icon: 'linkedin', href: c.linkedin, display: bare(c.linkedin), external: true },
    { label: 'GitHub', icon: 'github', href: c.github, display: bare(c.github), external: true },
  ];
}

export function Contact({ form }: { form: Form }) {
  const { values: v, errors, status, errorDetail, setField, touch, submit } = form;
  const channels = contactChannels().filter((c) => c.href || CONFIG.showDemoLabels);
  const sending = status === 'sending';
  const phoneRequired = v.contactPref === 'WhatsApp' || v.contactPref === 'Ligação';

  // Shared props for validated fields: error state + description wiring.
  const a11y = (k: keyof typeof v, id: string) => ({
    id,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? id + '-err' : undefined,
    onBlur: () => touch(k),
  });
  const err = (k: keyof typeof v, id: string) =>
    errors[k] ? <span id={id + '-err'} className="field__error">{errors[k]}</span> : null;

  return (
    <section id="contato" aria-labelledby="contato-title">
      <div className="band-wrap">
        <div className="contact-band">
          <span className="contact-band__ring contact-band__ring--a" aria-hidden="true" />
          <span className="contact-band__ring contact-band__ring--b" aria-hidden="true" />
          <div className="container contact-band__inner" ref={reveal} data-reveal>
            {/* 06 enquanto a seção "Sobre mim" estiver desativada; volte para 07 ao reativá-la. */}
            <p className="contact-band__kicker"><span>06</span> Contato</p>
            <h2 id="contato-title" className="contact-band__title">
              <span>Tem uma ideia ou um desafio para resolver?</span>
              <span>Vamos construir a solução juntos.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container contact">
        <div className="contact__aside">
          <p className="contact__lede">
            Conte o que você precisa. Respondemos com perguntas, uma visão inicial de caminho e os próximos passos, sem compromisso.
          </p>
          {channels.length > 0 && (
            <ul className="channels">
              {channels.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} className="channel" {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      <span className="channel__icon"><Icon name={c.icon} size={22} /></span>
                      <span className="channel__text">
                        <span className="channel__label">{c.label}</span>
                        <span className="channel__value">{c.display}</span>
                      </span>
                      <Icon name="arrowUpRight" size={18} className="channel__arrow" />
                      {c.external && <span className="sr-only">(abre em nova aba)</span>}
                    </a>
                  ) : (
                    <div className="channel channel--missing">
                      <span className="channel__icon"><Icon name={c.icon} size={22} /></span>
                      <span className="channel__text">
                        <span className="channel__label">{c.label}</span>
                        <span className="channel__value">A configurar em CONFIG.contacts</span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <form className="contact-form" noValidate onSubmit={submit} aria-describedby="form-status">
          {/* Honeypot: hidden from people, filled by bots. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp"
            value={v.website} onChange={(e) => setField('website', e.target.value)} />

          <div className="field">
            <label htmlFor="f-name">Nome <span aria-hidden="true">*</span></label>
            <input className="input" type="text" name="name" autoComplete="name" maxLength={120} required
              value={v.name} onChange={(e) => setField('name', e.target.value)} {...a11y('name', 'f-name')} />
            {err('name', 'f-name')}
          </div>

          <div className="field">
            <label htmlFor="f-email">E-mail <span aria-hidden="true">*</span></label>
            <input className="input" type="email" name="email" autoComplete="email" inputMode="email" maxLength={160} required
              value={v.email} onChange={(e) => setField('email', e.target.value)} {...a11y('email', 'f-email')} />
            {err('email', 'f-email')}
          </div>

          <div className="field">
            <label htmlFor="f-company">Empresa <span className="field__opt">(opcional)</span></label>
            <input id="f-company" className="input" type="text" name="company" autoComplete="organization" maxLength={120}
              value={v.company} onChange={(e) => setField('company', e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="f-phone">
              Telefone ou WhatsApp {phoneRequired ? <span aria-hidden="true">*</span> : <span className="field__opt">(opcional)</span>}
            </label>
            <input className="input" type="tel" name="phone" autoComplete="tel" inputMode="tel" maxLength={30}
              placeholder="(00) 00000-0000" required={phoneRequired}
              value={v.phone} onChange={(e) => setField('phone', e.target.value)} {...a11y('phone', 'f-phone')} />
            {err('phone', 'f-phone')}
          </div>

          <div className="field">
            <label htmlFor="f-type">Tipo de projeto <span aria-hidden="true">*</span></label>
            <select className="input" name="type" required value={v.type}
              onChange={(e) => setField('type', e.target.value)} {...a11y('type', 'f-type')}>
              <option value="">Selecione…</option>
              {projectTypes.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {err('type', 'f-type')}
          </div>

          <div className="field">
            <label htmlFor="f-budget">Faixa de orçamento <span className="field__opt">(opcional)</span></label>
            <select id="f-budget" className="input" name="budget" value={v.budget} onChange={(e) => setField('budget', e.target.value)}>
              <option value="">Prefiro não informar</option>
              {BUDGETS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field field--full">
            <label htmlFor="f-msg">Descreva sua necessidade <span aria-hidden="true">*</span></label>
            <textarea className="input" name="message" maxLength={MESSAGE_MAX} required rows={6}
              placeholder="O que você quer construir ou resolver? Quem vai usar? Existe algum prazo ou sistema atual envolvido?"
              value={v.message} onChange={(e) => setField('message', e.target.value)} {...a11y('message', 'f-msg')} />
            <div className="field__row">
              {err('message', 'f-msg') ?? <span />}
              <span className="field__count" aria-hidden="true">{v.message.length} / {MESSAGE_MAX}</span>
            </div>
          </div>

          <fieldset className="field field--full" aria-describedby={errors.contactPref ? 'f-pref-err' : undefined}>
            <legend>Melhor forma de contato <span aria-hidden="true">*</span></legend>
            <div className="seg">
              {CONTACT_PREFS.map((p, i) => (
                <label key={p} className="seg__opt">
                  <input type="radio" id={'f-pref-' + i} name="contactPref" value={p} checked={v.contactPref === p}
                    onChange={() => { setField('contactPref', p); touch('contactPref'); }} />
                  <span>{p}</span>
                </label>
              ))}
            </div>
            {errors.contactPref && <span id="f-pref-err" className="field__error">{errors.contactPref}</span>}
          </fieldset>

          <div className="contact-form__footer">
            <button type="submit" className="btn btn-primary btn-lg contact-form__submit" disabled={sending}>
              <span>{sending ? 'Enviando…' : 'Enviar mensagem'}</span>
              <Icon name={sending ? 'loader' : 'arrowRight'} size={18} className={sending ? 'spin' : 'btn-arrow'} />
            </button>
            <p className="contact-form__privacy">Usamos seus dados apenas para responder a este contato.</p>
            <div id="form-status" role="status" aria-live="polite">
              {status === 'success' && (
                <div className="form-msg form-msg--success">
                  <Icon name="check" size={22} />
                  <div>
                    <strong>Mensagem enviada.</strong>
                    <span>Obrigado pelo contato. Vamos responder pelo canal que você escolheu.</span>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="form-msg form-msg--error">
                  <strong>Não foi possível enviar.</strong>
                  <span>{errorDetail} Tente novamente em instantes ou use um dos canais diretos.</span>
                </div>
              )}
              {status === 'unconfigured' && (
                <div className="form-msg form-msg--info">
                  <strong>Formulário válido, envio ainda não configurado.</strong>
                  <span>
                    Nenhuma mensagem foi enviada. Defina CONFIG.form.endpoint (ex.: sua API ou um serviço de formulários)
                    para ativar o envio. Enquanto isso, use os canais diretos ao lado.
                  </span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
