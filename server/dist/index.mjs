import $e from 'cors';
import Je from 'http';
import de from 'express';
import le from 'body-parser';
import Ve from 'cookie-parser';
import He from 'compression';
import Be from 'morgan';
import { Router as Oe } from 'express';
import me from 'jsonwebtoken';
var q = (e, t, r) => {
  let s = e.headers.authorization;
  if (!s) return t.status(401).send('Access Denied / Unauthorized request');
  try {
    if (((s = s.split(' ')[1]), s === 'null' || !s))
      return t.status(401).send('Unauthorized request');
    me.verify(s, process.env.TOKEN_SECRET, (o, n) => {
      if ((console.log(o, n), o))
        return console.log(o.message), t.status(401).json({ error: o.message });
      (e.body.tokenUser = n), r();
    });
  } catch (o) {
    return console.log(o), t.status(401).send('Unauthorized | Invalid Token');
  }
};
import { pagination as fe } from 'prisma-extension-pagination';
import we from 'jsonwebtoken';
import J from 'bcrypt';
import 'dotenv/config';
import { PrismaClient as he } from '@prisma/client';
var V = (e) => we.sign(e, process.env.TOKEN_SECRET, { expiresIn: '30 days' }),
  T = async (e) => {
    let t = await J.genSalt(10);
    return await J.hash(e, t);
  };
var d = new he().$extends(fe()),
  H = (e) => Object.keys(e).length === 0 && e.constructor === Object,
  p = async (e, t) => {
    try {
      return await e();
    } catch (r) {
      return (
        console.log(r),
        t.status(400).json({ message: 'Something went wrong!', errors: r })
      );
    }
  };
var P = {
  async index(e, t) {
    await p(async () => {
      let { page: r = 1, pageSize: s = 20, sort: o, q: n = '' } = e.query,
        c = await d.user
          .paginate({
            ...(o && { orderBy: JSON.parse(JSON.stringify(o, null, 2)) }),
            where: {
              ...(n && {
                OR: [
                  { name: { contains: n.toString(), mode: 'insensitive' } },
                  { username: { contains: n.toString(), mode: 'insensitive' } },
                ],
              }),
            },
          })
          .withPages({ limit: +s, page: +r, includePageCount: !0 });
      return t
        .status(200)
        .json({
          message: 'Users retrieve successfully!',
          data: c[0],
          meta: c[1],
        });
    }, t);
  },
  async show(e, t) {
    let { id: r } = e.params,
      s = await d.user.findUnique({
        where: { username: r.toString() },
        include: { _count: !0 },
      });
    if (!s) return t.status(404).json({ error: 'User not found!' });
    let { password: o, ...n } = s;
    return t
      .status(200)
      .json({ message: 'User retrieve successfully!', data: n });
  },
  async update(e, t) {
    let { id: r } = e.params;
    if (H(e.body)) return t.status(400).json({ error: 'Body Required!' });
    await p(
      async () => (
        await d.user.update({ where: { id: r.toString() }, data: e.body }),
        t.status(200).json({ message: 'Update user successfully!' })
      ),
      t
    );
  },
  async delete(e, t) {
    let { id: r } = e.params;
    await p(
      async () => (
        await d.user.delete({ where: { id: r.toString() } }), t.sendStatus(204)
      ),
      t
    );
  },
};
var B = (e) => {
  e.get('/users', P.index),
    e.get('/users/:id', P.show),
    e.delete('/users/:id', q, P.delete),
    e.put('/users/:id', q, P.update);
};
var h = (e) => (t, r, s) => {
  let o = e.safeParse(t.body);
  if (o.success) (t.body = o.data), s();
  else {
    let { error: n } = o;
    return console.log(n), r.status(400).send(n.flatten().fieldErrors);
  }
};
import { z as l } from 'zod';
var z = l.object({
    email: l
      .string()
      .email({ message: 'Email is invalid' })
      .min(1, { message: 'Email is required' }),
    password: l
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    name: l
      .string()
      .min(1, { message: 'Name must be at least 1 character' })
      .max(50, { message: 'Name must be 50 characters' }),
    gender: l.enum(['MALE', 'FEMALE', 'CUSTOM']),
  }),
  G = l.object({ email: l.string().min(1), password: l.string().min(6) }),
  W = l.object({
    email: l.string().email().min(1),
    token: l.string().min(9).max(9),
  }),
  Y = l.object({ email: l.string().email().min(1) }),
  Z = l.object({
    email: l.string().email().min(1),
    token: l.string().min(5),
    newPassword: l.string().min(1),
  });
import Pe from 'bcrypt';
import { faker as Se } from '@faker-js/faker';
import 'dotenv/config';
import ge from 'nodemailer';
var ye = {
    service: 'gmail',
    auth: {
      user: process.env.NODEJS_GMAIL_APP_USER,
      pass: process.env.NODEJS_GMAIL_APP_PASSWORD,
    },
  },
  K = (e, t, r) => ({
    from: process.env.NODEJS_GMAIL_APP_USER,
    to: t,
    subject: 'Reset Password',
    html: `<div>
      <p>Your code is: http://localhost:3000/reset-password/${e}.</p>
       <p>Use it to reset your password in Loopfeed.</p>
       <p>If you didn't request this, simply ignore this message.</p>
       <p>Yours, The Loopfeed Team</p>
    </div>`,
  }),
  Q = (e, t) => ({
    from: process.env.NODEJS_GMAIL_APP_USER,
    to: t,
    subject: 'Verify registration',
    html: `
      <div>
      <p>Your code is: ${e}.</p>
       <p>Use it to verify your email verification in Loopfeed.</p>
       <p>If you didn't request this, simply ignore this message.</p>
       <p>Yours, The Loopfeed Team</p>
    </div>
    `,
  }),
  _ = ge.createTransport(ye);
var g = {
  async register(e, t) {
    try {
      let { email: r } = e.body,
        s = await T(e.body.password),
        o = Se.number.int({ min: 1e8, max: 999999999 }).toString();
      return (
        await d.user.create({
          data: { ...e.body, password: s, rememberToken: o },
        }),
        console.log('email'),
        await _.sendMail(Q(o, [r])),
        t
          .status(200)
          .send({ message: 'Registration successful,Check your email' })
      );
    } catch (r) {
      return (
        console.log(r), t.status(400).send({ message: 'User already existed' })
      );
    }
  },
  async verify(e, t) {
    try {
      let { email: r, token: s } = e.body,
        o = await d.user.findUnique({ where: { email: r } });
      return o
        ? o.rememberToken !== s
          ? t.status(400).json({ error: 'Invalid token!' })
          : (await d.user.update({
              where: { email: r },
              data: { isVerified: !0, rememberToken: null },
            }),
            t.status(200).send({ message: 'Email verified successful!' }))
        : t.status(404).json({ error: 'User not found!' });
    } catch (r) {
      return (
        console.log(r), t.status(400).send({ message: 'Something went wrong!' })
      );
    }
  },
  async login(e, t) {
    let { email: r, password: s } = e.body,
      o = await d.user.findUnique({
        where: { email: r },
        select: {
          id: !0,
          bio: !0,
          isVerified: !0,
          email: !0,
          name: !0,
          username: !0,
          profilePicture: !0,
          gender: !0,
          isAdmin: !0,
          isBlocked: !0,
          dateOfBirth: !0,
          createdAt: !0,
          password: !0,
        },
      });
    if (!o) return t.status(400).send({ message: 'Something went wrong!' });
    let n = await Pe.compare(s, o.password),
      { password: c, ...a } = o;
    return n
      ? t.status(200).send({ data: { ...a }, jwt: V({ p: c, ...a }) })
      : t.status(400).send({ message: 'Email or password does not work!' });
  },
  async forgotPassword(e, t) {
    try {
      let { email: r } = e.body,
        s = await d.user.findUnique({ where: { email: r } });
      if (!s) return t.status(400).send({ message: 'User not found' });
      let o = crypto.randomUUID().toString();
      return (
        await _.sendMail(K(o, [s.email], s.name)),
        await d.user.update({
          where: { id: s.id },
          data: {
            resetToken: o,
            expiredToken: new Date(Date.now() + 60 * 60 * 10),
          },
        }),
        t.status(201).json({ message: 'Email sent' })
      );
    } catch (r) {
      return (
        console.log(r), t.status(400).send({ message: 'Something went wrong!' })
      );
    }
  },
  async resetPassword(e, t) {
    try {
      let r = e.body.password,
        s = e.body.token,
        o = await d.user.findFirst({
          where: {
            AND: [
              { resetToken: { equals: s.toString() } },
              { expiredToken: { gt: new Date(Date.now()) } },
            ],
          },
        });
      return o
        ? (await d.user.update({
            where: { id: o.id },
            data: {
              resetToken: null,
              expiredToken: null,
              password: await T(r),
            },
          }),
          t.status(200).json({ message: 'Password updated' }))
        : t.status(400).json({ error: 'User not found' });
    } catch (r) {
      return (
        console.log(r), t.status(400).send({ message: 'Something went wrong!' })
      );
    }
  },
};
var ee = (e) => {
  e.post('/auth/register', h(z), g.register),
    e.post('/auth/login', h(G), g.login),
    e.post('/auth/verify', h(W), g.verify),
    e.post('/auth/forgot-password', h(Y), g.forgotPassword),
    e.post('/auth/reset-password', h(Z), g.resetPassword);
};
var O = {
  async index(e, t) {
    await p(async () => {
      let { page: r = 1, pageSize: s = 20, sort: o, q: n = '' } = e.query,
        c = await d.post
          .paginate({
            ...(o && { orderBy: JSON.parse(JSON.stringify(o, null, 2)) }),
            where: {
              ...(n && {
                OR: [
                  { caption: { contains: n.toString(), mode: 'insensitive' } },
                ],
              }),
            },
            include: {
              user: {
                select: {
                  id: !0,
                  bio: !0,
                  email: !0,
                  name: !0,
                  username: !0,
                  profilePicture: !0,
                  gender: !0,
                },
              },
              _count: !0,
              Comment: {
                include: {
                  user: { select: { id: !0, username: !0, name: !0 } },
                },
              },
              Like: {
                include: {
                  user: { select: { id: !0, username: !0, name: !0 } },
                },
              },
            },
          })
          .withPages({ limit: +s, page: +r, includePageCount: !0 });
      return t
        .status(200)
        .json({
          message: 'Users retrieve successfully!',
          data: c[0],
          meta: c[1],
        });
    }, t);
  },
  async store(e, t) {
    await p(
      async () => (
        await d.post.create({ data: e.body }),
        t.status(201).json({ message: 'Post created!' })
      ),
      t
    );
  },
  async show(e, t) {
    let { id: r } = e.params;
    await p(async () => {
      let s = await d.post.findUnique({
        where: { id: r },
        include: {
          _count: !0,
          Comment: {
            include: { user: { select: { id: !0, username: !0, name: !0 } } },
          },
          Like: {
            include: { user: { select: { id: !0, username: !0, name: !0 } } },
          },
          user: {
            select: {
              id: !0,
              bio: !0,
              email: !0,
              name: !0,
              username: !0,
              profilePicture: !0,
              gender: !0,
            },
          },
        },
      });
      return t.status(200).json(s);
    }, t);
  },
};
var te = (e) => {
  e.get('/posts', O.index),
    e.get('/posts/:id', O.show),
    e.post('/posts', O.store);
};
var N = {
  async like(e, t) {
    await p(
      async () => (
        await d.like.create({ data: e.body }),
        t.status(201).json({ message: 'Like post' })
      ),
      t
    );
  },
  async unlike(e, t) {
    let { id: r } = e.params;
    await p(
      async () => (
        await d.like.delete({ where: { id: r } }),
        t.status(200).json({ message: 'Unlike post' })
      ),
      t
    );
  },
};
var re = (e) => {
  e.post('/likes', N.like), e.delete('/likes/:id', N.unlike);
};
var U = {
  async index(e, t) {
    await p(async () => {
      let {
          page: r = 1,
          pageSize: s = 20,
          sort: o,
          q: n = '',
          postId: c,
        } = e.query,
        a = await d.comment
          .paginate({
            ...(o && { orderBy: JSON.parse(JSON.stringify(o, null, 2)) }),
            where: { ...(c && { postId: { equals: c.toString() } }) },
            include: {
              user: {
                select: {
                  id: !0,
                  bio: !0,
                  email: !0,
                  name: !0,
                  username: !0,
                  profilePicture: !0,
                  gender: !0,
                },
              },
            },
          })
          .withPages({ limit: +s, page: +r, includePageCount: !0 });
      return t
        .status(200)
        .json({
          message: 'Users retrieve successfully!',
          data: a[0],
          meta: a[1],
        });
    }, t);
  },
  async store(e, t) {
    await p(
      async () => (
        await d.comment.create({ data: e.body }),
        t.status(201).json({ message: 'Post created!' })
      ),
      t
    );
  },
  async show(e, t) {
    let { id: r } = e.params;
    await p(async () => {
      let s = await d.comment.findUnique({
        where: { id: r },
        include: {
          user: {
            select: {
              id: !0,
              bio: !0,
              email: !0,
              name: !0,
              username: !0,
              profilePicture: !0,
              gender: !0,
            },
          },
        },
      });
      return t.status(200).json(s);
    }, t);
  },
};
var se = (e) => {
  e.get('/comments', U.index), e.post('/comments', U.store);
};
var y = Oe(),
  oe = () => (ee(y), B(y), te(y), re(y), se(y), y);
import 'dotenv/config';
var ne = Symbol('dangerouslyDisableDefaultSrc'),
  be = {
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'font-src': ["'self'", 'https:', 'data:'],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'object-src': ["'none'"],
    'script-src': ["'self'"],
    'script-src-attr': ["'none'"],
    'style-src': ["'self'", 'https:', "'unsafe-inline'"],
    'upgrade-insecure-requests': [],
  },
  ie = () => Object.assign({}, be),
  xe = (e) => e.replace(/[A-Z]/g, (t) => '-' + t.toLowerCase()),
  ae = (e) => /;|,/.test(e),
  ve = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function Re(e) {
  let t = ie(),
    { useDefaults: r = !0, directives: s = t } = e,
    o = new Map(),
    n = new Set(),
    c = new Set();
  for (let a in s) {
    if (!ve(s, a)) continue;
    if (a.length === 0 || /[^a-zA-Z0-9-]/.test(a))
      throw new Error(
        `Content-Security-Policy received an invalid directive name ${JSON.stringify(a)}`
      );
    let u = xe(a);
    if (n.has(u))
      throw new Error(
        `Content-Security-Policy received a duplicate directive ${JSON.stringify(u)}`
      );
    n.add(u);
    let i = s[a],
      f;
    if (i === null) {
      if (u === 'default-src')
        throw new Error(
          'Content-Security-Policy needs a default-src but it was set to `null`. If you really want to disable it, set it to `contentSecurityPolicy.dangerouslyDisableDefaultSrc`.'
        );
      c.add(u);
      continue;
    } else if (typeof i == 'string') f = [i];
    else if (i)
      if (i === ne)
        if (u === 'default-src') {
          c.add('default-src');
          continue;
        } else
          throw new Error(
            `Content-Security-Policy: tried to disable ${JSON.stringify(u)} as if it were default-src; simply omit the key`
          );
      else f = i;
    else
      throw new Error(
        `Content-Security-Policy received an invalid directive value for ${JSON.stringify(u)}`
      );
    for (let w of f)
      if (typeof w == 'string' && ae(w))
        throw new Error(
          `Content-Security-Policy received an invalid directive value for ${JSON.stringify(u)}`
        );
    o.set(u, f);
  }
  if (
    (r &&
      Object.entries(t).forEach(([a, u]) => {
        !o.has(a) && !c.has(a) && o.set(a, u);
      }),
    !o.size)
  )
    throw new Error(
      'Content-Security-Policy has no directives. Either set some or disable the header'
    );
  if (!o.has('default-src') && !c.has('default-src'))
    throw new Error(
      'Content-Security-Policy needs a default-src but none was provided. If you really want to disable it, set it to `contentSecurityPolicy.dangerouslyDisableDefaultSrc`.'
    );
  return o;
}
function ke(e, t, r) {
  let s,
    o = [];
  return (
    r.forEach((n, c) => {
      let a = '';
      for (let u of n) a += ' ' + (u instanceof Function ? u(e, t) : u);
      a
        ? ae(a)
          ? (s = new Error(
              `Content-Security-Policy received an invalid directive value for ${JSON.stringify(c)}`
            ))
          : o.push(`${c}${a}`)
        : o.push(c);
    }),
    s || o.join(';')
  );
}
var S = function (t = {}) {
  let r = t.reportOnly
      ? 'Content-Security-Policy-Report-Only'
      : 'Content-Security-Policy',
    s = Re(t);
  return function (n, c, a) {
    let u = ke(n, c, s);
    u instanceof Error ? a(u) : (c.setHeader(r, u), a());
  };
};
S.getDefaultDirectives = ie;
S.dangerouslyDisableDefaultSrc = ne;
var Ce = new Set(['require-corp', 'credentialless', 'unsafe-none']);
function Ee({ policy: e = 'require-corp' }) {
  if (Ce.has(e)) return e;
  throw new Error(
    `Cross-Origin-Embedder-Policy does not support the ${JSON.stringify(e)} policy`
  );
}
function A(e = {}) {
  let t = Ee(e);
  return function (s, o, n) {
    o.setHeader('Cross-Origin-Embedder-Policy', t), n();
  };
}
var De = new Set(['same-origin', 'same-origin-allow-popups', 'unsafe-none']);
function qe({ policy: e = 'same-origin' }) {
  if (De.has(e)) return e;
  throw new Error(
    `Cross-Origin-Opener-Policy does not support the ${JSON.stringify(e)} policy`
  );
}
function j(e = {}) {
  let t = qe(e);
  return function (s, o, n) {
    o.setHeader('Cross-Origin-Opener-Policy', t), n();
  };
}
var Te = new Set(['same-origin', 'same-site', 'cross-origin']);
function _e({ policy: e = 'same-origin' }) {
  if (Te.has(e)) return e;
  throw new Error(
    `Cross-Origin-Resource-Policy does not support the ${JSON.stringify(e)} policy`
  );
}
function I(e = {}) {
  let t = _e(e);
  return function (s, o, n) {
    o.setHeader('Cross-Origin-Resource-Policy', t), n();
  };
}
function M() {
  return function (t, r, s) {
    r.setHeader('Origin-Agent-Cluster', '?1'), s();
  };
}
var Ne = new Set([
  'no-referrer',
  'no-referrer-when-downgrade',
  'same-origin',
  'origin',
  'strict-origin',
  'origin-when-cross-origin',
  'strict-origin-when-cross-origin',
  'unsafe-url',
  '',
]);
function Ue({ policy: e = ['no-referrer'] }) {
  let t = typeof e == 'string' ? [e] : e;
  if (t.length === 0)
    throw new Error('Referrer-Policy received no policy tokens');
  let r = new Set();
  return (
    t.forEach((s) => {
      if (Ne.has(s)) {
        if (r.has(s))
          throw new Error(
            `Referrer-Policy received a duplicate policy token ${JSON.stringify(s)}`
          );
      } else
        throw new Error(
          `Referrer-Policy received an unexpected policy token ${JSON.stringify(s)}`
        );
      r.add(s);
    }),
    t.join(',')
  );
}
function F(e = {}) {
  let t = Ue(e);
  return function (s, o, n) {
    o.setHeader('Referrer-Policy', t), n();
  };
}
var Ae = 180 * 24 * 60 * 60;
function je(e = Ae) {
  if (e >= 0 && Number.isFinite(e)) return Math.floor(e);
  throw new Error(
    `Strict-Transport-Security: ${JSON.stringify(e)} is not a valid value for maxAge. Please choose a positive integer.`
  );
}
function Ie(e) {
  if ('maxage' in e)
    throw new Error(
      'Strict-Transport-Security received an unsupported property, `maxage`. Did you mean to pass `maxAge`?'
    );
  'includeSubdomains' in e &&
    console.warn(
      'Strict-Transport-Security middleware should use `includeSubDomains` instead of `includeSubdomains`. (The correct one has an uppercase "D".)'
    );
  let t = [`max-age=${je(e.maxAge)}`];
  return (
    (e.includeSubDomains === void 0 || e.includeSubDomains) &&
      t.push('includeSubDomains'),
    e.preload && t.push('preload'),
    t.join('; ')
  );
}
function b(e = {}) {
  let t = Ie(e);
  return function (s, o, n) {
    o.setHeader('Strict-Transport-Security', t), n();
  };
}
function x() {
  return function (t, r, s) {
    r.setHeader('X-Content-Type-Options', 'nosniff'), s();
  };
}
function v(e = {}) {
  let t = e.allow ? 'on' : 'off';
  return function (s, o, n) {
    o.setHeader('X-DNS-Prefetch-Control', t), n();
  };
}
function R() {
  return function (t, r, s) {
    r.setHeader('X-Download-Options', 'noopen'), s();
  };
}
function Me({ action: e = 'sameorigin' }) {
  let t = typeof e == 'string' ? e.toUpperCase() : e;
  switch (t) {
    case 'SAME-ORIGIN':
      return 'SAMEORIGIN';
    case 'DENY':
    case 'SAMEORIGIN':
      return t;
    default:
      throw new Error(
        `X-Frame-Options received an invalid action ${JSON.stringify(e)}`
      );
  }
}
function k(e = {}) {
  let t = Me(e);
  return function (s, o, n) {
    o.setHeader('X-Frame-Options', t), n();
  };
}
var Fe = new Set(['none', 'master-only', 'by-content-type', 'all']);
function Le({ permittedPolicies: e = 'none' }) {
  if (Fe.has(e)) return e;
  throw new Error(
    `X-Permitted-Cross-Domain-Policies does not support ${JSON.stringify(e)}`
  );
}
function C(e = {}) {
  let t = Le(e);
  return function (s, o, n) {
    o.setHeader('X-Permitted-Cross-Domain-Policies', t), n();
  };
}
function E() {
  return function (t, r, s) {
    r.removeHeader('X-Powered-By'), s();
  };
}
function D() {
  return function (t, r, s) {
    r.setHeader('X-XSS-Protection', '0'), s();
  };
}
function Xe(e) {
  var t, r, s, o, n, c, a, u;
  let i = [];
  switch (e.contentSecurityPolicy) {
    case void 0:
    case !0:
      i.push(S());
      break;
    case !1:
      break;
    default:
      i.push(S(e.contentSecurityPolicy));
      break;
  }
  switch (e.crossOriginEmbedderPolicy) {
    case void 0:
    case !1:
      break;
    case !0:
      i.push(A());
      break;
    default:
      i.push(A(e.crossOriginEmbedderPolicy));
      break;
  }
  switch (e.crossOriginOpenerPolicy) {
    case void 0:
    case !0:
      i.push(j());
      break;
    case !1:
      break;
    default:
      i.push(j(e.crossOriginOpenerPolicy));
      break;
  }
  switch (e.crossOriginResourcePolicy) {
    case void 0:
    case !0:
      i.push(I());
      break;
    case !1:
      break;
    default:
      i.push(I(e.crossOriginResourcePolicy));
      break;
  }
  switch (e.originAgentCluster) {
    case void 0:
    case !0:
      i.push(M());
      break;
    case !1:
      break;
    default:
      console.warn(
        'Origin-Agent-Cluster does not take options. Remove the property to silence this warning.'
      ),
        i.push(M());
      break;
  }
  switch (e.referrerPolicy) {
    case void 0:
    case !0:
      i.push(F());
      break;
    case !1:
      break;
    default:
      i.push(F(e.referrerPolicy));
      break;
  }
  if ('strictTransportSecurity' in e && 'hsts' in e)
    throw new Error(
      'Strict-Transport-Security option was specified twice. Remove `hsts` to silence this warning.'
    );
  let f = (t = e.strictTransportSecurity) !== null && t !== void 0 ? t : e.hsts;
  switch (f) {
    case void 0:
    case !0:
      i.push(b());
      break;
    case !1:
      break;
    default:
      i.push(b(f));
      break;
  }
  if ('xContentTypeOptions' in e && 'noSniff' in e)
    throw new Error(
      'X-Content-Type-Options option was specified twice. Remove `noSniff` to silence this warning.'
    );
  switch (
    (r = e.xContentTypeOptions) !== null && r !== void 0 ? r : e.noSniff
  ) {
    case void 0:
    case !0:
      i.push(x());
      break;
    case !1:
      break;
    default:
      console.warn(
        'X-Content-Type-Options does not take options. Remove the property to silence this warning.'
      ),
        i.push(x());
      break;
  }
  if ('xDnsPrefetchControl' in e && 'dnsPrefetchControl' in e)
    throw new Error(
      'X-DNS-Prefetch-Control option was specified twice. Remove `dnsPrefetchControl` to silence this warning.'
    );
  let L =
    (s = e.xDnsPrefetchControl) !== null && s !== void 0
      ? s
      : e.dnsPrefetchControl;
  switch (L) {
    case void 0:
    case !0:
      i.push(v());
      break;
    case !1:
      break;
    default:
      i.push(v(L));
      break;
  }
  if ('xDownloadOptions' in e && 'ieNoOpen' in e)
    throw new Error(
      'X-Download-Options option was specified twice. Remove `ieNoOpen` to silence this warning.'
    );
  switch ((o = e.xDownloadOptions) !== null && o !== void 0 ? o : e.ieNoOpen) {
    case void 0:
    case !0:
      i.push(R());
      break;
    case !1:
      break;
    default:
      console.warn(
        'X-Download-Options does not take options. Remove the property to silence this warning.'
      ),
        i.push(R());
      break;
  }
  if ('xFrameOptions' in e && 'frameguard' in e)
    throw new Error(
      'X-Frame-Options option was specified twice. Remove `frameguard` to silence this warning.'
    );
  let X = (n = e.xFrameOptions) !== null && n !== void 0 ? n : e.frameguard;
  switch (X) {
    case void 0:
    case !0:
      i.push(k());
      break;
    case !1:
      break;
    default:
      i.push(k(X));
      break;
  }
  if (
    'xPermittedCrossDomainPolicies' in e &&
    'permittedCrossDomainPolicies' in e
  )
    throw new Error(
      'X-Permitted-Cross-Domain-Policies option was specified twice. Remove `permittedCrossDomainPolicies` to silence this warning.'
    );
  let $ =
    (c = e.xPermittedCrossDomainPolicies) !== null && c !== void 0
      ? c
      : e.permittedCrossDomainPolicies;
  switch ($) {
    case void 0:
    case !0:
      i.push(C());
      break;
    case !1:
      break;
    default:
      i.push(C($));
      break;
  }
  if ('xPoweredBy' in e && 'hidePoweredBy' in e)
    throw new Error(
      'X-Powered-By option was specified twice. Remove `hidePoweredBy` to silence this warning.'
    );
  switch ((a = e.xPoweredBy) !== null && a !== void 0 ? a : e.hidePoweredBy) {
    case void 0:
    case !0:
      i.push(E());
      break;
    case !1:
      break;
    default:
      console.warn(
        'X-Powered-By does not take options. Remove the property to silence this warning.'
      ),
        i.push(E());
      break;
  }
  if ('xXssProtection' in e && 'xssFilter' in e)
    throw new Error(
      'X-XSS-Protection option was specified twice. Remove `xssFilter` to silence this warning.'
    );
  switch ((u = e.xXssProtection) !== null && u !== void 0 ? u : e.xssFilter) {
    case void 0:
    case !0:
      i.push(D());
      break;
    case !1:
      break;
    default:
      console.warn(
        'X-XSS-Protection does not take options. Remove the property to silence this warning.'
      ),
        i.push(D());
      break;
  }
  return i;
}
var ce = Object.assign(
  function (t = {}) {
    var r;
    if (
      ((r = t.constructor) === null || r === void 0 ? void 0 : r.name) ===
      'IncomingMessage'
    )
      throw new Error(
        'It appears you have done something like `app.use(helmet)`, but it should be `app.use(helmet())`.'
      );
    let s = Xe(t);
    return function (n, c, a) {
      let u = 0;
      (function i(f) {
        if (f) {
          a(f);
          return;
        }
        let w = s[u];
        w ? (u++, w(n, c, i)) : a();
      })();
    };
  },
  {
    contentSecurityPolicy: S,
    crossOriginEmbedderPolicy: A,
    crossOriginOpenerPolicy: j,
    crossOriginResourcePolicy: I,
    originAgentCluster: M,
    referrerPolicy: F,
    strictTransportSecurity: b,
    xContentTypeOptions: x,
    xDnsPrefetchControl: v,
    xDownloadOptions: R,
    xFrameOptions: k,
    xPermittedCrossDomainPolicies: C,
    xPoweredBy: E,
    xXssProtection: D,
    dnsPrefetchControl: v,
    xssFilter: D,
    permittedCrossDomainPolicies: C,
    ieNoOpen: R,
    noSniff: x,
    frameguard: k,
    hidePoweredBy: E,
    hsts: b,
  }
);
var m = de();
m.use($e({ credentials: !0 }));
m.use(ce());
m.use(Be('dev'));
m.use(He());
m.use(Ve());
m.use(le.json());
m.use(de.static('public'));
m.use(le.urlencoded({ extended: !0 }));
m.use('/api/v1', oe());
var ze = Je.createServer(m),
  ue = process.env.PORT || '8080';
ze.listen(ue, async () => {
  try {
    console.log(`Server running on http://localhost:${ue} \u2728`);
  } catch (e) {
    console.log(e), process.exit();
  }
});
process.on('SIGINT', () => {
  process.exit();
});
var pe = m;
var nr = pe;
export { nr as default };
//# sourceMappingURL=index.mjs.map
